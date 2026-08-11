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
// right, overlapping rather than gating one on the other. mode="popLayout"
// pulls the exiting screen out of flow (position: absolute) the instant
// it starts leaving and mounts the incoming one immediately in normal
// flow -- deliberately NOT mode="wait": that mode blocks the new screen
// from rendering until the old one's exit finishes, which means if that
// completion ever doesn't fire (backgrounded tab mid-tap, dropped frames,
// a slow device), the app is stuck showing stale content under a
// mismatched URL. Confirmed that failure mode directly while testing.
const VARIANTS = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};
const TRANSITION = { duration: 0.32, ease: [0.16, 1, 0.3, 1] };

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
