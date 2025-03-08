import { useMemo } from "react";
import { ReviewType } from "../components/Types";
import data from "../data.json"

export const memoryFetcher = (url: string): Promise<any> => {

    const reviews: ReviewType[] = data || [];

    const groupedReviews = () => {
        let result: ReviewType[] = [];
        reviews.sort((a, b) => (a.date > b.date ? 1 : -1)).forEach(r => {
            if(!result.find(g => g.workTitle === r.workTitle)) {
                result = result.concat(r);
            }
        }); 
    
        return result;    
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockData: Record<string, any> = {
          '/api/reviews': reviews,
          '/api/grouped-reviews': groupedReviews(),
        };
  
        const reviewsMatch = url.match(/^\/api\/reviews\/([\w-]+)$/);
        if (reviewsMatch) {
          const reviewName = reviewsMatch[1];
          const review = reviews.find((r: { name: string }) => r.name === reviewName);

          if (review) {
            resolve(review);
          } else {
            reject(new Error('Review not found'));
          }
          return;
        }

        const otherReviewsMatch = url.match(/^\/api\/reviews\/([\w-]+)\/others$/);
        if (otherReviewsMatch) {
          const reviewName = otherReviewsMatch[1];
          const review = reviews.find((r: { name: string }) => r.name === reviewName)

          if (!review) {
            reject(new Error('Review not found'));
          } 

          const others = reviews.filter(r => r.workTitle === review?.workTitle && r.name !== review?.name);
          resolve(others);
          return;
        }

        let resource = mockData[url];

        if (resource) {
            resolve(resource);
        } else {
            reject(new Error('Review not found'));
        }
      }, 200); 
    });
  };
  