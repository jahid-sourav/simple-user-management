import { Helmet } from "react-helmet-async";

export default function Another() {
  return (
    <div className="template-container py-6">
      <Helmet>
        <title>Another Page</title>
      </Helmet>
      <h2>Another Page</h2>
    </div>
  );
}
