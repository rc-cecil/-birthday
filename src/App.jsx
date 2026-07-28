import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Heart,
  LockKey,
  Play,
  Sparkle,
  X,
} from "@phosphor-icons/react";

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const handler = (event) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

function extractVideoFrame(videoSrc) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.preload = "metadata";

    const onLoadedMetadata = () => {
      video.currentTime = 0.1;
    };

    const onSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      cleanup();
      resolve(dataUrl);
    };

    const onError = () => {
      cleanup();
      resolve(null);
    };

    const cleanup = () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      video.src = "";
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    video.src = videoSrc;
  });
}

const questions = [
  {
    prompt: "What is my favorite thing about you?",
    hint: "It is the one thing you bring into every room.",
    options: ["Your smile", "Your kindness", "Your laugh", "All of you"],
    answer: "All of you",
  },
  {
    prompt: "What makes an ordinary day feel special?",
    hint: "No place or plan required.",
    options: ["Good weather", "Spending time with you", "A fancy dinner", "Sleeping in"],
    answer: "Spending time with you",
  },
  {
    prompt: "Who deserves the biggest celebration today?",
    hint: "This one should be very easy.",
    options: ["The birthday girl", "Your best friend", "Your favorite singer", "Me"],
    answer: "The birthday girl",
  },
  {
    prompt: "How many memories do I want to make with you?",
    hint: "Think bigger than any number.",
    options: ["100", "1,000", "A million", "Countless"],
    answer: "Countless",
  },
  {
    prompt: "Ready to open your little birthday universe?",
    hint: "There is only one right answer.",
    options: ["Not yet", "Absolutely", "Maybe later", "Let me think"],
    answer: "Absolutely",
  },
];

const memories = [
  { type: "image", src: "/memories/photo-01.jpg", label: "That smile", note: "The kind that makes every room brighter.", color: "#ff7899" },
  { type: "image", src: "/memories/photo-02.jpg", label: "Golden days", note: "The first picture you ever sent to me, i think its my favorite.", color: "#ffb34f" },
  { type: "video", src: "/memories/video-01.MOV", label: "In motion", note: "first video i ever got of you.", color: "#a86bf0" },
  // { type: "image", src: "/memories/photo-03.jpg", label: "Pure joy", note: "You, completely and wonderfully you.", color: "#46a982" },
  // { type: "image", src: "/memories/photo-04.jpg", label: "Our kind of magic", note: "Nothing staged. Just a perfect little moment.", color: "#508ee8" },
  { type: "video", src: "/memories/video-02.MOV", label: "Press play", note: "A tiny scene I never want to forget.", color: "#ee6b55" },
];

const videoMoments = [
  { type: "video", src: "/memories/video-03.MOV", label: "The first favorite", note: "The video that still makes me smile first.", color: "#a86bf0" },
  { type: "video", src: "/memories/video-04.MOV", label: "A little movie", note: "A tiny scene with a very permanent place in my heart.", color: "#ee6b55" },
  { type: "video", src: "/memories/video-05.MOV", label: "Laugh track", note: "For the clips where your joy becomes the whole room.", color: "#2f9f8f" },
  { type: "video", src: "/memories/video-06.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-07.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-08.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-09.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-10.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-11.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-12.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-13.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
  { type: "video", src: "/memories/video-14.MOV", label: "More of you", note: "Drop another favorite video here and it will join the show.", color: "#d69a2d" },
];

const celebrationNotes = [
  { title: "The glow", copy: "You make ordinary moments look like they were planned by the universe.", meta: "01" },
  { title: "The laugh", copy: "It changes the whole mood of a day before anyone even notices it happened.", meta: "02" },
  { title: "The softness", copy: "You carry a tenderness that makes people feel lucky to be near you.", meta: "03" },
  { title: "The adventure", copy: "Every simple plan gets better because you are part of it.", meta: "04" },
];

const birthdayPlans = [
  "No rushing today.",
  "Your favorite photos get the spotlight.",
  "Videos play like tiny birthday films.",
  "The afternoon is reserved for rest, softness, and being adored.",
];

const ambientStars = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  left: `${8 + (index * 9) % 84}%`,
  top: `${8 + (index * 13) % 78}%`,
  size: 6 + (index % 3) * 2,
  delay: `${(index % 6) * 0.18}s`,
}));

function Confetti() {
  const colors = ["#ff4f7b", "#ffc857", "#66c7a5", "#7d6fe8", "#ffffff"];
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 36 }, (_, i) => (
        <i
          key={i}
          style={{
            "--x": `${(i * 47) % 100}vw`,
            "--delay": `${(i % 9) * 0.08}s`,
            "--duration": `${2.4 + (i % 5) * 0.28}s`,
            "--color": colors[i % colors.length],
            "--rotation": `${(i * 83) % 360}deg`,
          }}
        />
      ))}
    </div>
  );
}

function Quiz({ onUnlock }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("idle");
  const reduceMotion = useReducedMotion();
  const current = questions[index];

  const choose = (option) => {
    if (status === "correct") return;
    setSelected(option);
    if (option !== current.answer) {
      setStatus("wrong");
      window.setTimeout(() => setStatus("idle"), 650);
      return;
    }
    setStatus("correct");
    window.setTimeout(() => {
      if (index === questions.length - 1) {
        onUnlock();
      } else {
        setIndex((value) => value + 1);
        setSelected("");
        setStatus("idle");
      }
    }, reduceMotion ? 250 : 850);
  };

  return (
    <main className="quiz-shell">
      <div className="quiz-backdrop" aria-hidden="true">
        {ambientStars.map((star) => (
          <motion.span
            key={star.id}
            className="ambient-star"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.34, 0.95, 0.45], scale: [0.8, 1.12, 0.85] }}
            transition={{ duration: 3.2 + (star.id % 4), repeat: Infinity, delay: star.delay }}
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          />
        ))}
        <motion.div className="quiz-orb orb-one" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="quiz-orb orb-two" animate={{ y: [0, 18, 0], rotate: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      </div>

      <header className="quiz-header">
        <motion.span className="mini-mark" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Heart weight="fill" /> for you
        </motion.span>
        <motion.span className="secret-label" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}>
          <LockKey /> top secret
        </motion.span>
      </header>

      <section className="quiz-stage" aria-live="polite">
        <motion.div className="quiz-intro" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">A tiny test before your surprise</p>
          <h1>You know us.<br /><em>Prove it.</em></h1>
          <p className="quiz-intro-copy">Choose the answer that feels most like us, and the rest of the evening will unfold.</p>
        </motion.div>

        <motion.div className="quiz-card-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
          <div className="progress-row">
            <span>Question {String(index + 1).padStart(2, "0")}</span>
            <span>{String(questions.length).padStart(2, "0")}</span>
          </div>
          <div className="progress-track">
            <motion.div animate={{ width: `${((index + 1) / questions.length) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={index}
              className={`quiz-card ${status}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 54, rotate: 1.5 }}
              animate={status === "wrong" ? { opacity: 1, x: [0, -10, 8, -4, 0] } : { opacity: 1, x: 0, rotate: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -54, rotate: -1.5 }}
              transition={status === "wrong" ? { duration: 0.4 } : { type: "spring", bounce: 0, duration: 0.45 }}
            >
              <div className="question-count">0{index + 1}</div>
              <h2>{current.prompt}</h2>
              <p>{current.hint}</p>
              <div className="answers">
                {current.options.map((option, optionIndex) => {
                  const isSelected = selected === option;
                  const isRight = isSelected && status === "correct";
                  const isWrong = isSelected && status === "wrong";
                  return (
                    <motion.button
                      key={option}
                      className={`${isRight ? "answer-correct" : ""} ${isWrong ? "answer-wrong" : ""}`}
                      onClick={() => choose(option)}
                      disabled={status === "correct"}
                      whileHover={!reduceMotion ? { y: -2, scale: 1.01 } : undefined}
                      whileTap={!reduceMotion ? { scale: 0.98 } : undefined}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                      <span>{option}</span>
                      <span className="option-state">
                        {isRight ? <Check weight="bold" /> : isWrong ? <X weight="bold" /> : <ArrowRight />}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.article>
          </AnimatePresence>
          <p className={`quiz-feedback ${status}`}>
            {status === "wrong" ? "Not quite — you know this one." : status === "correct" ? "That’s the one." : "Choose with your heart."}
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function MediaCard({ item, index }) {
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [poster, setPoster] = useState(item.poster || null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (item.type === "video" && !item.poster && !poster) {
      extractVideoFrame(item.src).then((frame) => {
        if (frame) setPoster(frame);
      });
    }
  }, [item, poster]);

  const placeholder = (
    <div className="media-placeholder" style={{ "--card-color": item.color }}>
      <div className="placeholder-number">{String(index + 1).padStart(2, "0")}</div>
      <Heart weight="fill" />
      <span>Add your {item.type}</span>
      <small>{item.src.replace("/memories/", "")}</small>
    </div>
  );

  return (
    <>
      <motion.article
        className={`memory-card memory-${index + 1}`}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.65, delay: (index % 3) * 0.08 }}
        whileHover={!reduceMotion ? { y: -8, scale: 1.01, rotate: -1 } : undefined}
      >
        <button className="media-frame" onClick={() => !missing && setOpen(true)} aria-label={`Open ${item.label}`}>
          {missing ? placeholder : item.type === "image" ? (
            <img src={item.src} alt={item.label} onError={() => setMissing(true)} />
          ) : (
            <>
              <video src={item.src} poster={poster} muted preload="metadata" onError={() => setMissing(true)} />
              <span className="play-badge"><Play weight="fill" /></span>
            </>
          )}
        </button>
        <div className="memory-caption">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{item.label}</h3><p>{item.note}</p></div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <button className="close-lightbox" onClick={() => setOpen(false)} aria-label="Close"><X /></button>
            <motion.div
              className="lightbox-content"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              {item.type === "image" ? <img src={item.src} alt={item.label} /> : <video src={item.src} poster={poster} controls autoPlay />}
              <p>{item.label}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VideoGalleryItem({ item, index }) {
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [poster, setPoster] = useState(item.poster || null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!item.poster && !poster) {
      extractVideoFrame(item.src).then((frame) => {
        if (frame) setPoster(frame);
      });
    }
  }, [item, poster]);

  const setPreviewPlayback = (event, shouldPlay) => {
    const video = event.currentTarget.querySelector("video");
    if (!video || missing) return;
    if (shouldPlay) {
      video.play().catch(() => {});
      return;
    }
    video.pause();
  };

  return (
    <>
      <motion.button
        className={`video-gallery-tile tile-${index + 1}`}
        aria-label={`Open video ${index + 1}`}
        onClick={() => !missing && setOpen(true)}
        onMouseEnter={(event) => setPreviewPlayback(event, true)}
        onMouseLeave={(event) => setPreviewPlayback(event, false)}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 42, scale: 0.96, filter: "blur(10px)" }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.62, delay: index * 0.07 }}
        whileHover={!reduceMotion ? { scale: 1.025, zIndex: 3 } : undefined}
        whileTap={!reduceMotion ? { scale: 0.985 } : undefined}
      >
        {missing ? (
          <div className="video-empty-state" style={{ "--card-color": item.color }}>
            <Play weight="fill" />
            <span>{item.src.replace("/memories/", "")}</span>
          </div>
        ) : (
          <video
            src={item.src}
            poster={poster}
            muted
            playsInline
            preload="metadata"
            onError={() => setMissing(true)}
          />
        )}
        <span className="gallery-play" aria-hidden="true"><Play weight="fill" /></span>
        <span className="gallery-glow" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <button className="close-lightbox" onClick={() => setOpen(false)} aria-label="Close"><X /></button>
            <motion.div
              className="lightbox-content captionless"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", bounce: 0, duration: 0.36 }}
              onClick={(event) => event.stopPropagation()}
            >
              <video src={item.src} poster={poster} controls autoPlay playsInline />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const initialTimer = window.setTimeout(() => setShowConfetti(false), 4200);
    
    const interval = window.setInterval(() => {
      setShowConfetti(true);
      window.setTimeout(() => setShowConfetti(false), 4200);
    }, 15000);
    
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="birthday-page">
      {showConfetti && <Confetti />}
      <nav className="birthday-nav">
        <a href="#top" className="nav-mark"><Heart weight="fill" /> Birthday girl</a>
        <div className="nav-links">
          <a href="#memories">Our memories <ArrowDown /></a>
          <a href="#videos">More videos <Play /></a>
          <a href="#letter">A little note <Sparkle /></a>
        </div>
      </nav>

      <section className="birthday-hero" id="top">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
          <p className="eyebrow">Today is entirely yours</p>
          <h1>Happy birthday,<br /><em>Michy B.</em></h1>
          <p className="hero-note">You make life softer, brighter, and infinitely more fun. This little collection is to remind you of how beautiful you are.</p>
          <div className="hero-actions">
            <a className="hero-cta" href="#memories">Open the memories <ArrowDown weight="bold" /></a>
            <span className="hero-pill">crafted with heart</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -8, 0] }}
          transition={{ type: "spring", bounce: 0.12, duration: 1.7, repeat: Infinity, repeatType: "mirror" }}
        >
          <div className="sun-disc"><Sparkle weight="fill" /></div>
          <div className="hero-photo">
            <img src="/memories/hero.jpg" alt="The birthday girl" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling.style.display = "flex"; }} />
            <div className="hero-placeholder">
              <Heart weight="fill" />
              <span>Your favorite hero photo</span>
              <small>public/memories/hero.jpg</small>
            </div>
          </div>
          <span className="tape tape-one" />
          <span className="doodle-note">my favorite person</span>
        </motion.div>
      </section>

      <section className="celebration-board" aria-label="Birthday highlights">
        <motion.div
          className="board-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow">After the candles</p>
          <h2>The whole page is a little love letter.</h2>
          <p>Not just pictures in boxes. Little chapters, little promises, little reminders that today is centered on you.</p>
        </motion.div>
        <div className="board-grid">
          {celebrationNotes.map((note, index) => (
            <motion.article
              className="board-card"
              key={note.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.06 }}
            >
              <span>{note.meta}</span>
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* <section className="marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => <span key={i}>A life worth celebrating <Heart weight="fill" /> </span>)}
        </div>
      </section> */}

      <section className="memories-section" id="memories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The memory roll</p>
            <h2>A few reasons<br />I adore you.</h2>
          </div>
          <p>Photos fade. Videos end. But these remind me i have the most amazing person in my life.</p>
        </div>
        <div className="memory-grid">
          {memories.map((item, index) => <MediaCard key={item.src} item={item} index={index} />)}
        </div>
      </section>

      <section className="video-section" id="videos">
        <div className="video-header">
          <div>
            <p className="eyebrow">More videos of her</p>
            <h2>Press play on the moments that move.</h2>
          </div>
          <p>Videos get their own little theater, because some memories deserve more than a thumbnail.</p>
        </div>
        <div className="video-gallery-grid">
          {videoMoments.map((item, index) => <VideoGalleryItem key={item.src} item={item} index={index} />)}
        </div>
      </section>

      <section className="birthday-itinerary" aria-label="Birthday promises">
        <motion.div
          className="itinerary-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="eyebrow">For the rest of today</p>
          <h2>Only sweet things are on the schedule.</h2>
        </motion.div>
        <div className="promise-list">
          {birthdayPlans.map((plan, index) => (
            <motion.div
              className="promise-row"
              key={plan}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{plan}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="letter-section" id="letter">
        <motion.div initial={{ opacity: 0, rotate: -2, y: 35 }} whileInView={{ opacity: 1, rotate: -1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0, duration: 0.7 }} className="birthday-letter">
          <Sparkle className="letter-spark" weight="fill" />
          <p>My birthday wish for you</p>
          <h2>May this year return every bit of joy you give so freely to everyone around you.</h2>
          <div className="letter-signoff">With all my heart <Heart weight="fill" /></div>
        </motion.div>
      </section>

      <footer className="massage-footer">
        <div className="footer-content">
          <p className="eyebrow">One more birthday surprise</p>
          <h2>Be ready for your massage at 12pm.</h2>
          <p>Clear the afternoon, breathe slowly, and let today keep getting softer. You deserve the kind of rest that reaches your shoulders first.</p>
          <div className="footer-details">
            <span><Sparkle weight="fill" /> Calm mode only</span>
            <span><Heart weight="fill" /> Made with a ridiculous amount of love</span>
            <a href="#top">Back to the top <ArrowRight /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("birthday-unlocked") === "yes");
  const unlock = () => {
    sessionStorage.setItem("birthday-unlocked", "yes");
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <motion.div key="birthday" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <BirthdayPage />
        </motion.div>
      ) : (
        <motion.div key="quiz" exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.45 }}>
          <Quiz onUnlock={unlock} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
