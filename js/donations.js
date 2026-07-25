(() => {
  const form = document.querySelector("#donationForm");
  const table = document.querySelector("#donationTable");
  const search = document.querySelector("#searchDonation");
  if (!form || !table || !search) return;
  let donations = App.read("nss.donations");
  let editingId = null;
  const render = () => {
    const query = search.value.trim().toLowerCase();
    const rows = donations.filter(item => [item.name,item.payment,item.date].some(value => String(value).toLowerCase().includes(query)));
    table.innerHTML = rows.length ? rows.map(item => `<tr><td>${App.escapeHtml(item.name)}</td><td>${App.money(item.amount)}</td><td>${App.escapeHtml(item.payment)}</td><td>${App.escapeHtml(item.date)}</td><td><button class="btn btn-outline-secondary btn-sm" data-action="edit" data-id="${item.id}">Edit</button> <button class="btn btn-danger btn-sm" data-action="delete" data-id="${item.id}">Delete</button></td></tr>`).join("") : '<tr class="empty-state"><td colspan="5">No donations found.</td></tr>';
    document.querySelector("#totalAmount").textContent = App.money(donations.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    document.querySelector("#totalDonors").textContent = donations.length;
  };
  form.addEventListener("submit", event => { event.preventDefault(); if (!form.reportValidity()) return; const entry = { id: editingId || App.id(), name: form.donorName.value.trim(), amount: Number(form.donationAmount.value), payment: form.paymentMethod.value, date: form.donationDate.value }; if (editingId) donations = donations.map(item => item.id === editingId ? entry : item); else donations.unshift(entry); App.write("nss.donations", donations); editingId = null; form.reset(); form.querySelector("button[type='submit']").textContent = "Add donation"; render(); App.toast("Donation saved."); });
  table.addEventListener("click", event => { const button = event.target.closest("button[data-action]"); if (!button) return; const item = donations.find(entry => entry.id === button.dataset.id); if (!item) return; if (button.dataset.action === "delete") { if (!App.confirmDelete("donation")) return; donations = donations.filter(entry => entry.id !== item.id); App.write("nss.donations", donations); render(); App.toast("Donation deleted."); return; } editingId = item.id; form.donorName.value = item.name; form.donationAmount.value = item.amount; form.paymentMethod.value = item.payment; form.donationDate.value = item.date; form.querySelector("button[type='submit']").textContent = "Save changes"; form.donorName.focus(); });
  search.addEventListener("input", render); render();
})();
