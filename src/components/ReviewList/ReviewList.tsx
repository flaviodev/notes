import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { ReviewType } from '../Types';
import { Link } from 'react-router-dom';

const ReviewList: React.FC = () => {
  const { data, error, isLoading } = useFetch<ReviewType[]>('/api/grouped-reviews');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ul>
      {data?.map((review: ReviewType) => (
        <li key={review.name}><Link to={`/reviews/${review.name}`}>{review.workTitle}</Link></li>
      ))}
    </ul>
  );
};

export default ReviewList;
