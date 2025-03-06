"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

import styles from "./styles/workoutPage.module.scss"
import WorkoutCard from "../components/WorkoutCard"

export default function WorkoutPage() {
  const [currentTimeString, setCurrentTimeString] = useState("")
  const [workoutSets, setWorkoutSets] = useState([])
  const [removingIndices, setRemovingIndices] = useState([])

  useEffect(() => {
    console.log(workoutSets)
  }, [workoutSets])

  const generateCurrentTimeString = () => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const currentHourNumber = dayjs().hour()
    const currentDayNumber = dayjs().day()

    let timeOfDayString
    switch (true) {
      case currentHourNumber < 6:
        timeOfDayString = "Night"
        break
      case currentHourNumber < 12:
        timeOfDayString = "Morning"
        break
      case currentHourNumber < 18:
        timeOfDayString = "Afternoon"
        break
      default:
        timeOfDayString = "Evening"
        break
    }

    setCurrentTimeString(`${weekdays[currentDayNumber]} ${timeOfDayString}`)
  }

  useEffect(() => {
    generateCurrentTimeString()

    // TODO: Dynamically wire these up

    setWorkoutSets([
      {
        title: "Treadmill Warm-Up",
        initRestTime: 0,
        fields: ["Time", "Distance Traveled"],
        sets: [
          {
            setComplete: false,
            prev: "15:00 x 1.2 miles",
            field1: "15:00",
            field2: "1.5 miles",
          },
        ],
      },
      {
        title: "Romanian Deadlifts (RDL)",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "12 x 95 Lbs",
            field1: "12",
            field2: "105 Lbs",
          },
          {
            setComplete: false,
            prev: "12 x 95 Lbs",
            field1: "10",
            field2: "105 Lbs",
          },
        ],
      },
      {
        title: "Calf Raises",
        initRestTime: 1,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "20 x Bodyweight",
            field1: "20",
            field2: "Bodyweight + 25 Lbs",
          },
          {
            setComplete: false,
            prev: "20 x Bodyweight",
            field1: "18",
            field2: "Bodyweight + 25 Lbs",
          },
        ],
      },
      {
        title: "Barbell Squats",
        initRestTime: 2,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "10 x 135 Lbs",
            field1: "10",
            field2: "155 Lbs",
          },
          {
            setComplete: false,
            prev: "10 x 135 Lbs",
            field1: "8",
            field2: "155 Lbs",
          },
        ],
      },
      {
        title: "Elliptical Machine",
        initRestTime: 0,
        fields: ["Time", "Distance Traveled"],
        sets: [
          {
            setComplete: false,
            prev: "15:00 x 1.5 miles",
            field1: "15:00",
            field2: "1.8 miles",
          },
        ],
      },
      {
        title: "Hip Abductor Extensions",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "15 x 70 Lbs",
            field1: "15",
            field2: "75 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 70 Lbs",
            field1: "12",
            field2: "75 Lbs",
          },
        ],
      },
      {
        title: "Wall Sits",
        initRestTime: 1.5,
        fields: ["Time"],
        sets: [
          {
            setComplete: false,
            prev: "0:45",
            field1: "1:00",
          },
          {
            setComplete: false,
            prev: "0:45",
            field1: "0:50",
          },
        ],
      },
      {
        title: "Hip Adductor Extensions",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "15 x 60 Lbs",
            field1: "15",
            field2: "65 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 60 Lbs",
            field1: "12",
            field2: "65 Lbs",
          },
        ],
      },
    ])
  }, [])

  return (
    <div className={styles.mainDiv}>
      <div className={styles.overviewPanel}>
        <h1>{currentTimeString} Workout Plan</h1>
        <p className={styles.llmResponse}>
          This is some base text to see how it all looks. TODO: fix this. Today's workout will be a combination of
          cardio work and strength training, with particular focus on your legs and hips. We'll start off with a
          15-minute warm up on the treadmill, followed by some Romanian Deadlifts. From there we'll do some Calf Raises,
          then work the quad muscles with some Barbell Squats. Make sure you use a pad for your shoulders, and consider
          using a waist strap to keep your back straight. After the Squats, we'll do some work on the Elliptical Machine
          to lengthen your quads and mobilize your hips. We'll then do a compound set of Hip Abductor Extensions and
          Wall Sits, followed by our final set of Hip Adductor Extensions.{" "}
        </p>
        <h4>Would you like to adjust anything in this plan?</h4>
        <div className={styles.inputWithSubmitButton}>
          <textarea type="text" className={styles.mediumTextInput} placeholder="Add your comments here" />
          <button className={styles.regenerateButton}>Regenerate</button>
        </div>
      </div>
      <hr />
      <div className={styles.totalDurationPanel}>
        <div className={styles.basicFlex}>
          <h3 className={styles.durationTitle}>Workout Duration</h3>
          <button className={styles.pauseButton}>Pause</button>
        </div>
        <a className={styles.workoutTime}>1 Hour 5 Minutes 24 Seconds</a>
      </div>
      {workoutSets.map((item, index) => {
        const isRemoving = removingIndices.includes(index)
        return (
          <div
            key={`${item.title}${index}`}
            className={`${styles.workoutCardContainer} ${isRemoving ? styles.removing : ""}`}
          >
            <WorkoutCard
              setData={item}
              onRemove={(e) => {
                // First mark this index as removing (for animation)
                setRemovingIndices((prev) => [...prev, index])

                // Then actually remove it after the animation completes
                setTimeout(() => {
                  setWorkoutSets((previous) => previous.filter((_, i) => i !== index))
                  setRemovingIndices((prev) => prev.filter((i) => i !== index))
                }, 500) // Match this to your CSS transition duration
              }}
            />
          </div>
        )
      })}
      <div className={styles.bottomButtons}>
        <button className={styles.addWorkoutButton}>+ Add New Workout</button>
        <button className={styles.finishButton}>Finish Workout</button>
      </div>
    </div>
  )
}

