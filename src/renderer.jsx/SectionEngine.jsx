import React from "react"

// 🔥 import section components (we create them next)
import ObservationSection from "../sections/ObeservationSection"
import QuestionSection from "../sections/QuestionSection"
import RevealSection from "../sections/RevealSection"
import ScriptSection from "../sections/ScriptSection"
import BridgeSection from "../sections/BridgeSection"
import CriticalSection from "../sections/CriticalSection"
import TransitionSection from "../sections/TransitionSection"
import ConceptIntroSection from "../sections/ConceptIntroSection"
import MappingSection from "../sections/MappingSection"
import ConnectionSection from "../sections/ConnectionSection"
import DeepExplanationSection from "../sections/DeepExplanationSection"
import RealWorldSection from "../sections/RealWorldSection"
import PracticeGroupSection from "../sections/PracticeGroupSection"
export default function SectionEngine({ section }) {

    if (!section) {
        return (
            <div className="mb-8 p-6 border border-red-500 rounded-lg">
                Section data is missing.
            </div>
        )
    }

    switch (section.type) {

        case "observation":
            return <ObservationSection section={section} />

        case "interactive-question":
            return <QuestionSection section={section} />

        case "reveal":
            return <RevealSection section={section} />

        case "script":
            return <ScriptSection section={section} />

        case "bridge":
            return <BridgeSection section={section} />

        case "critical-moment":
            return <CriticalSection section={section} />

        case "transition":
            return <TransitionSection section={section} />

        case "concept-intro":
            return <ConceptIntroSection section={section} />

        case "mapping":
            return <MappingSection section={section} />

        case "connection":
            return <ConnectionSection section={section} />

        case "deep-explanation":
            return <DeepExplanationSection section={section} />

        case "real-world":
            return <RealWorldSection section={section} />
        case "practice-group":
            return <PracticeGroupSection section={section} />
        default:
            return (
                <div className="mb-8 p-6 border border-red-500 rounded-lg">
                    Unknown section: {section.type}
                </div>
            )
    }
}
