import { skillsArray } from "./skills";
import "./Select.css";
import { useEffect, useMemo, useState } from "react";

const SelectMenu = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setSkills(skillsArray);
  }, []);

  const filteredSkills = useMemo(() => {
    if (!query) return skills;
    return skills.filter((skill) => {
      return skill.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, skills]);

  return (
    <div
      onBlur={() => {
        setIsOpen(false);
      }}
      className="select-menu-container"
    >
      {selectedSkills.length > 0 && (
        <div className="selected-skills-bar">
          {selectedSkills.map((selectedSkill) => (
            <span
              onClick={() => {
                setSelectedSkills(
                  selectedSkills.filter((skill) => skill !== selectedSkill)
                );
              }}
              className="selected-skill"
            >
              {selectedSkill} &times;
            </span>
          ))}
        </div>
      )}
      <div className="input-bar-container">
        <input
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          className="select-input"
          type="text"
          placeholder="Select skills"
          value={query}
          required
        />
        <span
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="arrow-button"
        >
          &darr;
        </span>
      </div>
      {query ||
        (isOpen && (
          <ul
            tabIndex={0}
            onClick={(event) => {
              const selectedSkill = event.target as HTMLLIElement;
              if (selectedSkill.tagName === "LI") {
                const skill = selectedSkill.getAttribute("value");
                if (skill) {
                  if (!selectedSkills.includes(skill)) {
                    setSelectedSkills([...selectedSkills, skill]);
                  }
                }
              }
            }}
            className={isOpen ? "select-list visible" : "select-list"}
          >
            {filteredSkills && filteredSkills.length > 0 ? (
              filteredSkills.map((skill: string, index: number) => (
                <li
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="list-item"
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
        ))}
    </div>
  );
};

export default SelectMenu;
