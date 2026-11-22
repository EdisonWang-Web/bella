const filterButtons = document.querySelectorAll('[data-filter]');
const works = document.querySelectorAll('.work');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    works.forEach(work => {
      work.hidden = button.dataset.filter !== 'all' &&
        work.dataset.category !== button.dataset.filter;
    });
  });
});

const dialog = document.querySelector('#work-dialog');
if (dialog) {
  const video = dialog.querySelector('video');
  const title = dialog.querySelector('#dialog-title');
  const description = dialog.querySelector('#dialog-description');
  const errorMessage = dialog.querySelector('.video-error');

  document.querySelectorAll('.work-open').forEach(button => {
    button.addEventListener('click', () => {
      title.textContent = button.dataset.title;
      description.textContent = button.dataset.description;
      errorMessage.hidden = true;
      errorMessage.querySelector('a').href = button.dataset.video;
      video.poster = button.querySelector('img').src;
      video.src = button.dataset.video;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      video.play().catch(() => {});
    });
  });
  video.addEventListener('error', () => {
    errorMessage.hidden = false;
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.body.style.overflow = '';
  });
}

document.querySelector('.print-button')?.addEventListener('click', () => window.print());
