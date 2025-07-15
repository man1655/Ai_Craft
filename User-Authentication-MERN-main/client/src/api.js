const BASE_URL = 'http://localhost:4000/api/mock-test';

export async function generateTest(topic) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });
  return res.json();
}

export async function submitAnswers(testId, answers) {
  const res = await fetch(`${BASE_URL}/${testId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  return res.json();
}
