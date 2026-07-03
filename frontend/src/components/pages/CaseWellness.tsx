import CaseLayout from "./CaseLayout";
 
export default function CaseWellness() {
  return (
    <CaseLayout
      num="04"
      title="Wellness Personas of SNU"
      subtitle="ML-powered lifestyle persona discovery app using KMeans clustering. Users find their wellness persona through interactive sliders and radar charts."
      category="ML · Python · Streamlit"
      tags={["Python", "Scikit-learn", "KMeans", "Streamlit", "Matplotlib", "NumPy", "Pandas"]}
      color="#E0F2FF"
      accent="#2E5FE8"
      overview="Wellness Personas of SNU is an interactive web application that identifies a user's lifestyle persona based on their daily habits. It combines a trained KMeans clustering model with a human-centred Streamlit interface to help Sister Nivedita University students understand and reflect on their wellness patterns in an engaging, personalised way."
      problem="Students often lack awareness about how their daily habits — food choices, social activity, exercise, hobbies — connect to their overall wellness. There was no engaging, low-friction way for students to reflect on these patterns and get actionable, personalised insights without filling out long surveys or visiting a counsellor."
      research="Our research focused on the challenges of designing a user-friendly wellness assessment tool. We identified key pain points related to user engagement, data privacy, and the need for a more intuitive way to visualize and understand personal wellness patterns."
      solution="Built an interactive system that collects 8 lifestyle inputs through simple sliders, runs them through a pre-trained KMeans clustering model, and instantly assigns the user to one of 10 meaningful personas. Each persona comes with a radar chart visualisation, a descriptive profile, and a motivational quote — making the experience feel personal, not clinical."
      sections={[
        {
          title: "The 10 Personas",
          body: [
            "🍕 Social Foodie — Loves cafes, group dining, and trying new cuisines with friends",
            "🥗 Trendy Eater — Follows food trends, health fads, and stays current with wellness content",
            "🍰 Sweet Lover — Comfort-first approach to food, dessert enthusiast, values indulgence",
            "☕ Classic Soul — Calm, balanced, routine-oriented lifestyle with traditional preferences",
            "🎨 Creative Hobbyist — Artistic, expressive, spends free time in creative pursuits",
            "📚 Chill Introvert — Enjoys solitude, books, and low-stimulation environments",
            "🧘 Balanced Persona — Maintains harmony across food, fitness, social life, and rest",
            "💪 Active Extrovert — High energy, fitness-focused, thrives in social and athletic settings",
            "🌿 Minimalist — Simple and mindful living, low consumption, intentional choices",
            "🔥 Passionate Creator — Driven, focused, sacrifices comfort for goals and creative output"
          ]
        },
        {
          title: "Key Features",
          body: [
            "8 interactive lifestyle sliders covering food habits, social activity, exercise frequency, hobbies, and sleep patterns",
            "Instant persona assignment using a pre-trained KMeans model with Joblib serialisation",
            "Dynamic radar chart visualisation built with Matplotlib showing the user's lifestyle profile",
            "Dark-themed Streamlit UI designed for engagement and readability",
            "Personalised quotes and lifestyle descriptions for each of the 10 personas",
            "Fast inference — results appear within 1 second of slider interaction"
          ]
        },
        {
          title: "Machine Learning Approach",
          body: "The KMeans model was trained on a dataset of lifestyle survey responses from SNU students, with 10 clusters selected based on silhouette score analysis. Features were standardised using StandardScaler before clustering. The trained model and scaler were serialised with Joblib for production use in the Streamlit app. Each cluster was manually labelled and described based on its centroid values."
        },
        {
          title: "My Contribution",
          body: [
            "Designed the full UI/UX of the Streamlit interface — layout, color scheme, slider configuration, and persona display cards",
            "Contributed to ML integration — connecting the trained model to the live Streamlit input pipeline",
            "Designed the radar chart visualisation and persona card layout",
            "Led the interactive experience design to ensure the flow felt engaging rather than survey-like"
          ]
        },
        {
          title: "Outcome",
          body: "The app was deployed on Streamlit Cloud and used by SNU students for lifestyle reflection. The interactive format drove significantly higher engagement than traditional survey formats. Users reported that seeing their persona radar chart was a 'mirror moment' — it matched how they actually felt about their lifestyle."
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["Streamlit", "Custom CSS"] },
        { label: "ML / Data", items: ["Scikit-learn", "KMeans", "NumPy", "Pandas", "Joblib"] },
        { label: "Visualisation", items: ["Matplotlib"] },
        { label: "Deployment", items: ["Streamlit Cloud"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://wellnesspersonas-cthr6lsavffhyqmycxlyko.streamlit.app/", icon: "🌐" },
        { label: "View Code", href: "https://github.com/srijitabiswas/WellnessPersonas", icon: "⌥" }
      ]}
      team={["Srijita Biswas", "Prakriti Sarkar", "Sresthita Nath"]}
    />
  );
}