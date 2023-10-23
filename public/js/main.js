const questionheader = document.getElementsByClassName("soruh1")[0];
const infoheader = document.getElementsByClassName("info")[0];
const questioninput = document.getElementsByClassName("answerinput")[0];

const success = async () => {
  try {
    const response = await fetch("/questionsjson");

    const result = await response.json();

    questionheader.innerHTML = result.soru;
    infoheader.innerHTML = "";
    questioninput.value = "";
  } catch (error) {
    console.error("Error:", error);
  }
};

const getdata = async () => {
  const data = questionheader.innerHTML;
  const data2 = questioninput.value;

  try {
    const response = await fetch("/postanswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: data, answer: data2 }),
    });

    const result = await response.json();

    if (result === "Success") {
      infoheader.innerHTML = "True !!";
      infoheader.style.color = "green";
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await success();
    } else {
      infoheader.innerHTML = "Wrong Answer !!";
      infoheader.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const emement = [
  {
    id: "1",
    question: 'write in small letter "ANSHU"',
    answer: "anshu",
    created_at: "2023-10-23 09:07:50",
    updated_at: "2023-10-23 09:07:50",
  },
  {
    id: "2",
    question: 'how many letters in this word "Anshu"',
    answer: "5",
    created_at: "2023-10-23 09:08:23",
    updated_at: "2023-10-23 09:08:23",
  },
  {
    id: "4",
    question: "First Odd Number ?",
    answer: "1",
    created_at: "2023-10-23 09:11:27",
    updated_at: "2023-10-23 09:11:27",
  },
  {
    id: "3",
    question: "First Even no ?",
    answer: "2",
    created_at: "2023-10-23 09:11:19",
    updated_at: "2023-10-23 09:11:19",
  },
  {
    id: "5",
    question: "5 + 5",
    answer: "10",
    created_at: "2023-10-23 09:11:41",
    updated_at: "2023-10-23 09:11:41",
  },
];

// You can use the 'emement' array within the same module as needed.
