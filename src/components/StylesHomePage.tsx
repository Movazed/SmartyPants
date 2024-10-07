const StylesHomePage: React.FC = () => {
  return (
    <style jsx global>{`
      /* Preconnect to Google Fonts */
      @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      }

      /* Apply Audiowide font to headings */
      h2, .audiowide-font {
        font-family: 'Audiowide', cursive;
      }

      .animated-background {
        background: linear-gradient(120deg, #E3F2FD, #BBDEFB, #4DD0E1);
        background-size: 300% 300%;
        animation: gradientAnimation 10s ease infinite;
        position: relative;
        overflow: hidden;
      }

      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Bubble effect */
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
  );
};

export default StylesHomePage;
