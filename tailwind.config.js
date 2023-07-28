/** @type {import('tailwindcss').Config} */
export default {
  // prefix: "tw-",
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px"
    },
    extend: {
      colors: {
        "gray-light": "#DEE2E6"
      },
      fontFamily: {
        "space-mono-bold": ["'Space Mono'", "monospace"]
      },
      height: {
        "0vh": "0vh",
        "2vh": "2vh",
        "4vh": "4vh",
        "6vh": "6vh",
        "8vh": "8vh",
        "10vh": "10vh",
        "12vh": "12vh",
        "14vh": "14vh",
        "16vh": "16vh",
        "18vh": "18vh",
        "20vh": "20vh",
        "22vh": "22vh",
        "24vh": "24vh",
        "26vh": "26vh",
        "28vh": "28vh",
        "30vh": "30vh",
        "32vh": "32vh",
        "34vh": "34vh",
        "36vh": "36vh",
        "38vh": "38vh",
        "40vh": "40vh",
        "42vh": "42vh",
        "44vh": "44vh",
        "46vh": "46vh",
        "48vh": "48vh",
        "50vh": "50vh",
        "52vh": "52vh",
        "54vh": "54vh",
        "56vh": "56vh",
        "58vh": "58vh",
        "60vh": "60vh",
        "62vh": "62vh",
        "64vh": "64vh",
        "66vh": "66vh",
        "68vh": "68vh",
        "70vh": "70vh",
        "72vh": "72vh",
        "74vh": "74vh",
        "76vh": "76vh",
        "78vh": "78vh",
        "80vh": "80vh",
        "82vh": "82vh",
        "84vh": "84vh",
        "86vh": "86vh",
        "88vh": "88vh",
        "90vh": "90vh",
        "92vh": "92vh",
        "94vh": "94vh",
        "96vh": "96vh",
        "98vh": "98vh",
        "100vh": "100vh"
      },
      width: {
        "0vw": "0vw",
        "2vw": "2vw",
        "4vw": "4vw",
        "6vw": "6vw",
        "8vw": "8vw",
        "10vw": "10vw",
        "12vw": "12vw",
        "14vw": "14vw",
        "16vw": "16vw",
        "18vw": "18vw",
        "20vw": "20vw",
        "22vw": "22vw",
        "24vw": "24vw",
        "26vw": "26vw",
        "28vw": "28vw",
        "30vw": "30vw",
        "32vw": "32vw",
        "34vw": "34vw",
        "36vw": "36vw",
        "38vw": "38vw",
        "40vw": "40vw",
        "42vw": "42vw",
        "44vw": "44vw",
        "46vw": "46vw",
        "48vw": "48vw",
        "50vw": "50vw",
        "52vw": "52vw",
        "54vw": "54vw",
        "56vw": "56vw",
        "58vw": "58vw",
        "60vw": "60vw",
        "62vw": "62vw",
        "64vw": "64vw",
        "66vw": "66vw",
        "68vw": "68vw",
        "70vw": "70vw",
        "72vw": "72vw",
        "74vw": "74vw",
        "76vw": "76vw",
        "78vw": "78vw",
        "80vw": "80vw",
        "82vw": "82vw",
        "84vw": "84vw",
        "86vw": "86vw",
        "88vw": "88vw",
        "90vw": "90vw",
        "92vw": "92vw",
        "94vw": "94vw",
        "96vw": "96vw",
        "98vw": "98vw",
        "100vw": "100vw"
      },
      spacing: {
        "0%": "0%",
        "1%": "1%",
        "2%": "2%",
        "3%": "3%",
        "4%": "4%",
        "5%": "5%",
        "6%": "6%",
        "7%": "7%",
        "8%": "8%",
        "9%": "9%",
        "10%": "10%",
        "11%": "11%",
        "12%": "12%",
        "13%": "13%",
        "14%": "14%",
        "15%": "15%",
        "16%": "16%",
        "17%": "17%",
        "18%": "18%",
        "19%": "19%",
        "20%": "20%",
        "21%": "21%",
        "22%": "22%",
        "23%": "23%",
        "24%": "24%",
        "25%": "25%",
        "26%": "26%",
        "27%": "27%",
        "28%": "28%",
        "29%": "29%",
        "30%": "30%",
        "31%": "31%",
        "32%": "32%",
        "33%": "33%",
        "34%": "34%",
        "35%": "35%",
        "36%": "36%",
        "37%": "37%",
        "38%": "38%",
        "39%": "39%",
        "40%": "40%",
        "41%": "41%",
        "42%": "42%",
        "43%": "43%",
        "44%": "44%",
        "45%": "45%",
        "46%": "46%",
        "47%": "47%",
        "48%": "48%",
        "49%": "49%",
        "50%": "50%",
        "51%": "51%",
        "52%": "52%",
        "53%": "53%",
        "54%": "54%",
        "55%": "55%",
        "56%": "56%",
        "57%": "57%",
        "58%": "58%",
        "59%": "59%",
        "60%": "60%",
        "61%": "61%",
        "62%": "62%",
        "63%": "63%",
        "64%": "64%",
        "65%": "65%",
        "66%": "66%",
        "67%": "67%",
        "68%": "68%",
        "69%": "69%",
        "70%": "70%",
        "71%": "71%",
        "72%": "72%",
        "73%": "73%",
        "74%": "74%",
        "75%": "75%",
        "76%": "76%",
        "77%": "77%",
        "78%": "78%",
        "79%": "79%",
        "80%": "80%",
        "81%": "81%",
        "82%": "82%",
        "83%": "83%",
        "84%": "84%",
        "85%": "85%",
        "86%": "86%",
        "87%": "87%",
        "88%": "88%",
        "89%": "89%",
        "90%": "90%",
        "91%": "91%",
        "92%": "92%",
        "93%": "93%",
        "94%": "94%",
        "95%": "95%",
        "96%": "96%",
        "97%": "97%",
        "98%": "98%",
        "99%": "99%",
        "100%": "100%"
      }
    }
  },
  plugins: []
};
