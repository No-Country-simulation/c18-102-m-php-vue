<?php

namespace App\Http\Controllers\Teachers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CriteriaRequest;
use App\Repository\TeacherRepository;

class SearchTeacherController extends Controller
{
    public function __construct(
        private readonly TeacherRepository $repository
    ) {}

    public function __invoke(CriteriaRequest $request)
    {
        $data = $this->repository->getRecords($request["limit"], $request["offset"]);
        return response()->json($data, 200);
    }
}