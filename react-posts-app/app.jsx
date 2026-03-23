const { useState, useEffect } = React;

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle && !trimmedBody) return;
    onSubmit({ title: trimmedTitle, body: trimmedBody, id: Date.now() });
    setTitle("");
    setBody("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>New Post</h2>
      <input
        type="text"
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-title"
      />
      <textarea
        placeholder="Write your post here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="input-body"
        rows={6}
      />
      <button type="submit" className="btn-submit">
        Submit Post
      </button>
    </form>
  );
}

function Sidebar({ posts, onDelete }) {
  return (
    <aside className="sidebar">
      <h2>Posts <span className="badge">{posts.length}</span></h2>
      {posts.length === 0 ? (
        <p className="empty-msg">No posts yet. Write one!</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              {post.title && <strong className="post-title">{post.title}</strong>}
              {post.body && <p className="post-body">{post.body}</p>}
              <button
                className="btn-delete"
                onClick={() => onDelete(post.id)}
                title="Remove post"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function App() {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("posts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <span>📝 Post Board</span>
      </header>
      <div className="app-body">
        <main className="main-panel">
          <PostForm onSubmit={addPost} />
        </main>
        <Sidebar posts={posts} onDelete={deletePost} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
