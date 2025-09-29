/* load-students.js */
const roster = [
  'Aryssa',
  'Dhivyan',
  'Kashwin',
  'Luthfiyah',
  'Rowan',
  "Tharveen",
  "Rajeeth",
  "Aaraatanhaa",
  "Kavenesh",
  "ChanGai",
  "Nawal",
  "Niveshaa",
];

const catalogue = document.getElementById('students-catalogue');

const loadStudents = () => {
  roster.forEach(id => {
    fetch(`students/${id}/card.html`)
      .then(r => r.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const template = doc.querySelector('template#student-row');
        if (!template) return;

        const row = document.createElement('div');
        row.className = 'student-row';
        row.appendChild(template.content.cloneNode(true));
        catalogue.appendChild(row);
      });
  });
};

// Execute: Load students, and enable the flip when the DOM is ready
loadStudents();