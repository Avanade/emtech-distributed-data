const timeline = [
    {
      id: 1,
      content: "Shared data with",
      target: "Wandsworth Health",
      href: "#",
      date: "Apr 26",
      datetime: "2021-04-26",
    },
    {
      id: 2,
      content: "Shared data with",
      target: "Wandsworth Health",
      href: "#",
      date: "Apr 26",
      datetime: "2021-04-26",
    },
    {
      id: 3,
      content: "Shared data with",
      target: "Wandsworth Health",
      href: "#",
      date: "Apr 26",
      datetime: "2021-04-26",
    },
    {
      id: 4,
      content: "Shared data with",
      target: "Wandsworth Health",
      href: "#",
      date: "Apr 26",
      datetime: "2021-04-26",
    },
];

export default (req, res) => {
    res.status(200).json(timeline);
  }
