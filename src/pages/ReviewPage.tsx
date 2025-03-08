import { useParams } from "react-router-dom";
import Review from "../components/Review/Review";
import { Error404 } from "./Error404";

export const ReviewPage = () => {
    const params = useParams();
    const name = params.name;

    if (name) {
        return <Review name={name}/>;
    } else {
        return <Error404/>
    }
}