// Mobile Nav Toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    navLinks.classList.remove("active");
  });
});

// ========== GitHub API Working Version ==========
const GITHUB_USERNAME = "kuppalagurusubhash";
const projectContainer = document.getElementById("project-container");

async function loadGitHubRepos() {
  try {

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
      {
        headers: {
          "User-Agent": "request",       // <- REQUIRED FOR NEW API
          "Accept": "application/vnd.github+json"
        }
      }
    );

    if (!response.ok) {
      projectContainer.innerHTML = `<p>⚠️ GitHub API Error: ${response.status}</p>`;
      return;
    }

    const repos = await response.json();

    if (repos.length === 0) {
      projectContainer.innerHTML = `<p>No public repos found.</p>`;
      return;
    }

    // Only show first 6 repos
    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>

        <p><strong>Language:</strong> ${repo.language || "N/A"}</p>

        <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
      `;

      projectContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    projectContainer.innerHTML = `<p>⚠️ Failed to fetch GitHub repositories.</p>`;
  }
}

loadGitHubRepos();
