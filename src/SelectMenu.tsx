"use client";
import styles from "./Select.module.css";
import { useMemo, useState } from "react";
import { skillsArray } from "./skills";

const SelectMenu = () => {
  const [skills] = useState<string[]>(skillsArray);
  const [query, setQuery] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredSkills = useMemo(() => {
    if (!query) return skills;
    return skills.filter((skill) => {
      return skill.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, skills]);

  const props = {
    filteredSkills,
    isOpen,
    selectedSkills,
    setSelectedSkills,
    setIsOpen,
    setQuery,
    query,
  };

  return (
    <div className={`${styles.container}`}>
      {selectedSkills.length > 0 && <SelectedSkillsMenu props={props} />}
      <div className={styles.input_bar_container}>
        <SelectInput props={props} />
      </div>
      {isOpen && <SelectList props={props} />}
    </div>
  );
};

const SelectedSkillsMenu = ({ props }: Props) => {
  return (
    <div className={styles.selected_skills_bar}>
      {props.selectedSkills.map((selectedSkill, index: number) => (
        <span
          key={index}
          onClick={() => {
            props.setSelectedSkills(
              props.selectedSkills.filter((skill) => skill !== selectedSkill)
            );
          }}
          className={styles.selected_skill}
        >
          {selectedSkill} &times;
        </span>
      ))}
    </div>
  );
};

const SelectInput = ({ props }: Props) => {
  return (
    <>
      <input
        onChange={(event) => {
          props.setQuery(event.target.value);
          props.setIsOpen(true);
        }}
        className={styles.select_input}
        type="text"
        placeholder="Select skills"
        value={props.query}
      />
      <span
        onClick={() => {
          props.setIsOpen(!props.isOpen);
        }}
        className={styles.select_icon}
      >
        <div className={styles.arrow}>
          <svg
            width="30px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" />
            <path
              d="M12 6L12 18M12 18L17 13M12 18L7 13"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </span>
    </>
  );
};

const SelectList = ({ props }: Props) => {
  return (
    <ul
      className={`${styles.select_list} ${props.isOpen ? styles.visible : ""}`}
    >
      {props.filteredSkills.length > 0 ? (
        props.filteredSkills.map((skill: string, index: number) => (
          <li
            onClick={(event) => {
              event.stopPropagation();
              const skill = event.currentTarget.getAttribute("value");
              if (skill && !props.selectedSkills.includes(skill)) {
                props.setSelectedSkills([...props.selectedSkills, skill]);
              }
              props.setIsOpen(false);
              props.setQuery("");
            }}
            className={styles.list_item}
            key={index}
            value={skill}
          >
            {skill}
          </li>
        ))
      ) : (
        <li>No Results Found</li>
      )}
    </ul>
  );
};

interface Props {
  props: {
    filteredSkills: string[];
    isOpen: boolean;
    selectedSkills: string[];
    query: string;
    setSelectedSkills: (skills: string[]) => void;
    setIsOpen: (isOpen: boolean) => void;
    setQuery: (query: string) => void;
  };
}

export default SelectMenu;
