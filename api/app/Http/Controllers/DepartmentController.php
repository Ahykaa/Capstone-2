<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all();
        return response()->json(['departments' => $departments]);
    }
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'label' => 'required|string|max:255',
            // Add any other fields you want to validate for the department
        ]);

        // Create a new department with a budget set to 0
        $department = new Department();
        $department->label = $request->input('label');
        $department->budget = 0;
        // Set any other fields for the department

        $department->save();

        // Return a success response
        return response()->json(['message' => 'Department created successfully', 'department' => $department]);
    }
    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $request->validate([
            'budget' => 'required|numeric',
        ]);

        // Find the department by ID
        $department = Department::findOrFail($id);

        // Add the incoming budget to the existing budget
        $existingBudget = $department->budget ?? 0;
        $updatedBudget = $existingBudget + $request->input('budget');

        // Update the department's budget
        $department->budget = $updatedBudget;
        $department->save();

        // Return a success response
        return response()->json(['message' => 'Budget updated successfully', 'department' => $department]);
    }
}
