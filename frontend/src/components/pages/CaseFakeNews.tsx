import CaseLayout from "./CaseLayout";
 
export default function CaseFakeNews() {
  return (
    <CaseLayout
      num="05"
      title="Fake News Classification"
      subtitle="NLP-based supervised ML system that classifies news articles as fake or real with 93.58% accuracy using TF-IDF vectorization."
      category="NLP · Machine Learning"
      tags={["Python", "TF-IDF", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "NLP"]}
      color="#FFFBE0"
      accent="#C4A000"
      overview="A supervised machine learning system that automatically classifies news articles as Fake or Real using natural language processing techniques. With misinformation spreading rapidly across digital platforms, this project explores how ML can provide a scalable first-line defence against fake news."
      problem="Fake news spreads faster than fact-checks. Manual verification is slow, doesn't scale, and is impossible to apply to the volume of content published daily. There was a need for an automated system that could analyse news text and classify it reliably — helping platforms, journalists, and readers make faster decisions about content credibility."
      research="Our research focused on the challenges of classifying misinformation in digital environments. We examined the linguistic patterns and metadata associated with fake news articles, identifying key indicators that distinguish them from credible sources."
      solution="Built a supervised ML classification pipeline that preprocesses raw news text, extracts TF-IDF features, and classifies articles using Logistic Regression and Passive-Aggressive Classifier. The system achieves 93.58% accuracy on the test set, with balanced precision and recall across both classes."
      sections={[
        {
          title: "ML Pipeline",
          body: [
            "Data loading and exploration — analysed dataset structure, class distribution (balanced between Fake and Real), and text length distributions.",
            "Text preprocessing — removed punctuation, converted to lowercase, stripped stopwords using NLTK, and applied stemming for normalisation.",
            "Tokenisation — split articles into word tokens as the foundation for feature extraction.",
            "TF-IDF Vectorisation — converted tokenised text into numerical feature vectors using Term Frequency-Inverse Document Frequency weighting, highlighting discriminative words.",
            "Model training — trained both Logistic Regression and Passive-Aggressive Classifier on 80% of the dataset.",
            "Evaluation — tested on the held-out 20% split using accuracy score, classification report, and confusion matrix."
          ]
        },
        {
          title: "Model Results",
          body: [
            "Accuracy Score: 93.58% on the test set",
            "Precision: 0.93 — of articles classified as Fake, 93% were actually Fake",
            "Recall: 0.94 — of actual Fake articles, 94% were correctly identified",
            "F1 Score: 0.93 — strong balance between precision and recall",
            "Passive-Aggressive Classifier outperformed Logistic Regression by ~1.2% accuracy on this dataset"
          ]
        },
        {
          title: "Why TF-IDF Works Here",
          body: "Fake news articles often overuse sensational terms, emotional language, and specific trigger words that rarely appear in credible journalism. TF-IDF downweights common words (like 'the', 'said') and upweights words that are distinctive to each class — making it highly effective for separating factual from sensational writing styles."
        },
        {
          title: "My Role",
          body: [
            "Performed full data preprocessing pipeline — cleaning, normalisation, stopword removal, and stemming",
            "Implemented TF-IDF feature extraction with vocabulary size optimisation",
            "Trained, tested, and compared multiple classification algorithms",
            "Analysed model performance using confusion matrix and classification report",
            "Documented methodology and findings for the project report"
          ]
        },
        {
          title: "Challenges",
          body: [
            "Handling noisy and unstructured text — real-world news data contains HTML artifacts, unusual punctuation, and mixed character encodings that required robust preprocessing.",
            "Feature selection — choosing the right vocabulary size for TF-IDF (too small loses signal, too large creates noise and slows training).",
            "Generalisation — ensuring the model performs well on articles outside the training domain, not just memorising patterns from the training set."
          ]
        },
        {
          title: "Future Improvements",
          body: [
            "Deploy as a real-time web API where users can paste any news text and get an instant classification",
            "Integrate transformer-based models (BERT, RoBERTa) for significantly higher accuracy on nuanced text",
            "Add a confidence score so users can see how certain the model is about its classification",
            "Expand to multilingual fake news detection using multilingual BERT",
            "Build a browser extension that highlights suspicious articles while reading"
          ]
        }
      ]}
      techStack={[
        { label: "Language", items: ["Python 3"] },
        { label: "ML & NLP", items: ["Scikit-learn", "TF-IDF", "NLTK", "Passive-Aggressive Classifier", "Logistic Regression"] },
        { label: "Data", items: ["Pandas", "NumPy"] },
        { label: "Visualisation", items: ["Matplotlib", "Seaborn"] }
      ]}
      links={[
        { label: "View Code", href: "https://github.com/srijitabiswas/Fake-News-Classification", icon: "⌥" }
      ]}
      team={["Srijita Biswas", "Prakriti Sarkar", "Rumana Kar", "Neha Jha"]}
    />
  );
}