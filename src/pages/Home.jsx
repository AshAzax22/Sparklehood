import { useState } from "react";
import styles from "../css/home.module.css";
import Card from "../components/Card";
const Home = () => {
  const [formtoggle, setFormToggle] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description: "Algorithm consistently favored certain demographics...",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description: "LLM provided incorrect safety procedure information...",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description:
        "Chatbot inadvertently exposed non-sensitive user metadata...",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: cards.length + 1,
      title: e.target.title.value,
      description: e.target.description.value,
      severity: e.target.severity.value,
      reported_at: new Date().toISOString(),
    };
    setCards([...cards, newCard]);
    setFormToggle(false);
    e.target.reset();
  };

  const sortCards = (e) => {
    const sortOrder = e.target.value; // Get the selected sort order
    const sortedCards = [...cards].sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.reported_at) - new Date(a.reported_at);
      } else {
        return new Date(a.reported_at) - new Date(b.reported_at);
      }
    });
    setCards(sortedCards);
  };

  return (
    <div className={styles.container}>
      <h1>AI Safety Report</h1>
      <button
        className={formtoggle ? styles.cancel : styles.report}
        onClick={() => setFormToggle(!formtoggle)}
      >
        {formtoggle ? "Cancel" : "Report new Incident"}
      </button>

      {formtoggle && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Title"
          />

          <textarea
            id="description"
            name="description"
            required
            placeholder="Description"
          ></textarea>

          <select id="severity" name="severity" required>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      )}

      <div className={styles.optionsContainer}>
        <select
          id="filter"
          name="filter"
          className={styles.filterSelect}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          id="sort"
          name="sort"
          className={styles.sortSelect}
          onChange={(e) => sortCards(e)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className={styles.cardContainer}>
        {cards.map((card) => {
          if (
            card.severity.toLowerCase() === filter.toLowerCase() ||
            filter === "all"
          ) {
            return (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                severity={card.severity}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
