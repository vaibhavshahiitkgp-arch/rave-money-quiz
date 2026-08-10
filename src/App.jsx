import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Instructions from "./pages/Instructions";
import Quiz from "./pages/Quiz";
import Review from "./pages/Review";
import PostSubmit from "./pages/PostSubmit";
import Score from "./pages/Score";
import SolutionGate from "./pages/SolutionGate";
import Solution from "./pages/Solution";
import Share from "./pages/Share";
import CourseCTA from "./pages/CourseCTA";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/review" element={<Review />} />
      <Route path="/post-submit" element={<PostSubmit />} />
      <Route path="/score" element={<Score />} />
      <Route path="/solution-gate" element={<SolutionGate />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="/share" element={<Share />} />
      <Route path="/course" element={<CourseCTA />} />
    </Routes>
  );
}
