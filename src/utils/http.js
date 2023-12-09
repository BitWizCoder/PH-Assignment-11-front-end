export function fetchAssignments() {
  return fetch(`/assignments`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}
