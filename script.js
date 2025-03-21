const API_KEY = "5d11d6b117d747e697369ecc974a5600";
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

const categories = {
    world: { country: "", category: "general" },
    sports: { country: "", category: "sports" },
    movies: { country: "", category: "entertainment" },
    technology: { country: "", category: "technology" }
};

async function fetchNews() {
    try {
        const newsContainer = document.getElementById("news-container");
        newsContainer.innerHTML = ""; // Clear previous content

        for (let [category, { country, category: cat }] of Object.entries(categories)) {
            const response = await fetch(`${NEWS_API_URL}?country=${country}&category=${cat}&apiKey=${API_KEY}`);
            const data = await response.json();

            const categoryBlock = document.createElement("div");
            categoryBlock.classList.add("news-category");

            const categoryTitle = document.createElement("h2");
            categoryTitle.textContent = category.toUpperCase();
            categoryBlock.appendChild(categoryTitle);

            data.articles.slice(0, 5).forEach((news) => {
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");

                newsItem.innerHTML = `
                    <h3>${news.title}</h3>
                    <p>Source: ${news.source.name}</p>
                    ${news.urlToImage ? `<img src="${news.urlToImage}" alt="News Image">` : ""}
                    <a href="${news.url}" target="_blank">Read more</a>
                `;

                categoryBlock.appendChild(newsItem);
            });

            newsContainer.appendChild(categoryBlock);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Fetch news every 30 minutes
setInterval(fetchNews, 1800000);
document.addEventListener("DOMContentLoaded", fetchNews);
