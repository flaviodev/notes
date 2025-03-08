import { useFetch } from '../../hooks/useFetch';
import { ReviewType } from '../Types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Error404 } from '../../pages/Error404';
import { Link } from 'react-router-dom';

const Review = ({name} : { name: string}) => {
  const { data, error, isLoading } = useFetch<ReviewType>(`/api/reviews/${name}`);
  const { data: others, error: othersError, isLoading: isLoadingOthers } = useFetch<ReviewType[]>(`/api/reviews/${name}/others`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <Error404/>;

  return (
    <>
      <h1>{data?.title}</h1>

      <ReactMarkdown
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
        children={data?.content}
      />

      <ul>
        {others?.map((review:ReviewType) => (
          <li key={review.name}><Link to={`/reviews/${review.name}`}>{review.title}</Link></li>
        ))}
      </ul>
    </>
  );
};

export default Review;
