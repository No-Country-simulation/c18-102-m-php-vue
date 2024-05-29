<?php

namespace App\Repository;

use App\Domain\Criteria\Criteria;
use App\Eloquent\EloquentQuery;
use App\Models\Course;

final class CourseRepository
{
    public function getRecords(Criteria $criteria)
    {
        $query = EloquentQuery::queryConverter(new Course(), Course::with('teachers', 'students'), $criteria);
        $total = $query->count();

        $query->limit($criteria->limit)
            ->offset($criteria->offset);

        $results = $query->get();

        return [
            "rows" => $results->toArray(),
            "count" => $total,
        ];
    }
}