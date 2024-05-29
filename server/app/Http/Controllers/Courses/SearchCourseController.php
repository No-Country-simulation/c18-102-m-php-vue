<?php

namespace App\Http\Controllers\Courses;

use App\Domain\Criteria\RequestToCriteria;
use App\Domain\Errors\CatchException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CriteriaRequest;
use App\Repository\CourseRepository;

class SearchCourseController extends Controller
{
    public function __construct(
        private readonly CourseRepository $repository
    ) {}

    public function __invoke(CriteriaRequest $request)
    {
        try {
            $criteria = RequestToCriteria::converter($request);
            $data = $this->repository->getRecords($criteria);
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $e = new CatchException($th);
            return response()->json($e->getMessage(), $e->getCode());
        }
    }
}
