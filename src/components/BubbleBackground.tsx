export default function BubbleBackground() {
    return (
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');
  
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
  
          .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(120deg, #E3F2FD, #BBDEFB, #4DD0E1);
            background-size: 300% 300%;
            animation: gradientAnimation 10s ease infinite;
            z-index: -1;
          }
  
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
  
          .bubble {
            position: absolute;
            bottom: -50px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            opacity: 0.6;
            animation: bubbleUp 15s infinite ease-in-out;
          }
  
          @keyframes bubbleUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-300px) scale(1.2);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-600px) scale(1.5);
              opacity: 0;
            }
          }
  
          .bubble:nth-child(1) {
            width: 80px;
            height: 80px;
            left: 10%;
            animation-duration: 20s;
          }
          .bubble:nth-child(2) {
            width: 120px;
            height: 120px;
            left: 30%;
            animation-duration: 25s;
            animation-delay: 2s;
          }
          .bubble:nth-child(3) {
            width: 100px;
            height: 100px;
            left: 50%;
            animation-duration: 18s;
            animation-delay: 4s;
          }
          .bubble:nth-child(4) {
            width: 140px;
            height: 140px;
            left: 70%;
            animation-duration: 22s;
            animation-delay: 6s;
          }
          .bubble:nth-child(5) {
            width: 90px;
            height: 90px;
            left: 90%;
            animation-duration: 20s;
            animation-delay: 8s;
          }
        `}</style>
        <div className="animated-background"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </>
    );
  }