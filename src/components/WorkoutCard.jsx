"use client"

import { useEffect, useRef, useState } from "react"
import { restTimeOptions } from "../models/dropdownOptions"
import SelectDropdown from "./SelectDropdown"
import RangeSlider from "./RangeSlider"
import GreenCheck from "./icons/GreenCheck"
import ThreeDots from "./icons/ThreeDots"

import styles from "./styles/workoutCard.module.scss"

export default function WorkoutCard({ setData, onRemove, onReplace }) {
  const [restTime, setRestTime] = useState(setData.initRestTime)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const [setCompletion, setSetCompletion] = useState(setData.sets.map((s) => s.setComplete))

  const handleSetComplete = (setNum) => {
    setSetCompletion((prevCompletions) => {
      const newList = [...prevCompletions]
      newList[setNum] = !newList[setNum]
      return newList
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove && onRemove(setData.id)
    }, 500) // Match this to your CSS transition duration
  }

  return (
    <div className={`${styles.mainDiv} ${isRemoving ? styles.removing : ""}`}>
      <div className={styles.mainSetsDiv}>
        <div className={styles.header}>
          <div className={styles.sideBySide}>
            <button className={styles.moreButton} onClick={toggleMenu} ref={buttonRef}>
              <ThreeDots />
            </button>
            <div className={`${styles.titleContainer} ${menuOpen ? styles.titleShifted : ""}`}>
              <h2>{setData.title}</h2>
            </div>
            <div className={`${styles.optionsMenuContainer} ${menuOpen ? styles.menuVisible : ""}`}>
              {menuOpen && (
                <div className={styles.optionsMenu} ref={menuRef}>
                  <button
                    onClick={() => {
                      handleRemove()
                      setMenuOpen(false)
                    }}
                    className={styles.redText}
                  >
                    Delete Movement
                  </button>
                  <button
                    onClick={() => {
                      onReplace && onReplace(setData.id)
                      setMenuOpen(false)
                    }}
                  >
                    Replace Movement
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.sideBySide}>
            <p>Rest Time</p>
            <SelectDropdown
              options={restTimeOptions}
              value={restTime}
              onChange={(e) => {
                setRestTime(e.target.value)
              }}
            />
          </div>
        </div>
        <div className={styles.setBody}>
          <table>
            <thead>
              <tr>
                <th>Set</th>
                <th>Previous Value</th>
                <th>{setData.fields[0]}</th>
                {setData.fields.length >= 2 && <th>{setData.fields[1]}</th>}
                {setData.fields.length >= 3 && <th>{setData.fields[2]}</th>}
              </tr>
            </thead>
            <tbody>
              {setData.sets.map((set, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button
                        className={styles.setNumberButton}
                        onClick={(e) => {
                          handleSetComplete(index)
                        }}
                      >
                        {setCompletion[index] ? <GreenCheck /> : index + 1}
                      </button>
                    </td>
                    <td>{set.prev}</td>
                    <td>{set.field1}</td>
                    {setData.fields.length >= 2 && <td>{set.field2}</td>}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button className={styles.addSetButton}>+ Add Set</button>
        </div>
      </div>
      <div className={styles.difficultyDiv}>
        <h4>Set Difficulty</h4>
        <RangeSlider leftLabel="Too Easy" rightLabel="Impossible/DNF" />
      </div>
    </div>
  )
}

