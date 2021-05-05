
const shared = [
  {
    id:1,
    type:"Heart Rate",
    target: "Wandsworth Health",
    bgColor: 'bg-pink-600',
    initials: 'HR'
  }
];

export default (req, res) => {
  res.status(200).json(shared);
}
