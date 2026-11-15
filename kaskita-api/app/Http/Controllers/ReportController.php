<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Organization;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $totalIncome = (float) Transaction::where('organization_id', $orgId)->where('transaction_type', 'income')->sum('amount');
        $totalExpense = (float) Transaction::where('organization_id', $orgId)->where('transaction_type', 'expense')->sum('amount');
        $surplus = $totalIncome - $totalExpense;

        // Categories breakdown
        $categories = DB::table('transactions')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.organization_id', $orgId)
            ->where('transactions.transaction_type', 'expense')
            ->select('categories.name', DB::raw('SUM(transactions.amount) as total'))
            ->groupBy('categories.name')
            ->get();

        $monthlyTrend = [
            ['month' => 'Jun', 'income' => 7.2, 'expense' => 3.8],
            ['month' => 'Jul', 'income' => 8.6, 'expense' => 4.5],
            ['month' => 'Agu', 'income' => 7.8, 'expense' => 3.7],
            ['month' => 'Sep', 'income' => 8.1, 'expense' => 4.2],
            ['month' => 'Okt', 'income' => 7.5, 'expense' => 4.2],
            ['month' => 'Nov', 'income' => 8.5, 'expense' => 3.85],
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'summary' => [
                    'total_income' => $totalIncome,
                    'total_expense' => $totalExpense,
                    'surplus' => $surplus,
                    'period' => 'November 2026',
                    'updated_at' => '14 Nov 2026, 09.41 WIB',
                ],
                'categories' => $categories,
                'monthly_trend' => $monthlyTrend,
            ]
        ]);
    }
}
