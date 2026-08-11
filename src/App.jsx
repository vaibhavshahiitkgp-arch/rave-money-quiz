import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
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

// Outgoing screen slides left while the incoming one slides in from the
// right, overlapping instead of the instant swap React Router does by
// default -- mode="popLayout" pulls the exiting screen out of flow
// (position: absolute) the moment it starts exiting, so it doesn't push
// the entering screen's layout around while both are briefly on screen.
const VARIANTS = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -28 },
};
const TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] };

export default function App() {
  const location = useLocation();

  return (
    <div className="route-transition-frame">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={location.pathname}
          style={{ width: "100%", height: "100%" }}
          variants={VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={TRANSITION}
        >
          <Routes location={location}>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
