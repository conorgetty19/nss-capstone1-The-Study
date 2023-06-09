import { useNavigate } from "react-router-dom"
import { Collapse } from 'bootstrap';
import { useRef } from "react";
import { useEffect } from "react";

export const Resource = ({ id, link, creator, title, img, format, description, getAllResources }) => {
    const localStudyUser = localStorage.getItem("study_user")
    const studyUserObject = JSON.parse(localStudyUser)
    const navigate = useNavigate()


    const deleteResourceClickEvent = () => {
        return fetch(`http://localhost:8088/resources/${id}`, {
            method: "DELETE"
        })
            .then(() => [
                getAllResources()
            ])
    }

    const navigateUserToEditForm = (id) => {
        navigate(`/editForm/${id}`)
    }


    //used to create collapsible description on resource cards
    const collapsibleElement = useRef(null);
    useEffect(() => {
        new Collapse(collapsibleElement.current);
    }, []);


    return (
        <div >
            <section className="card bg-secondary mb-3 resource" style={{ width: "20rem", maxHeight: "22rem", height: "auto" }}>
                <div className="d-flex justify-content-between">
                    <div className="btn btn-dark card-title d-flex align-items-center" style={{ height: "6rem", width: "auto" }}>
                        <a className="custom-text-green-withoutHover" href={link}>{title}</a>
                    </div>
                    <img src={img} className="card-img" style={{ maxWidth: "9rem", width: "auto", maxHeight: "6rem", objectFit: "scale-down" }} />
                </div>
                <button type="button" className="btn btn-dark" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`}>
                    {format} Description
                </button>
                <div className="collapse show" id={`collapse${id}`} ref={collapsibleElement}>
                    <div className="card-text small text-white">
                        {description}
                    </div>
                </div>
                <div className="card-body">
                </div>
                {
                    studyUserObject.admin || studyUserObject.id === creator ?
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-dark" onClick={() => navigateUserToEditForm(id)}>Edit</button>
                            <button className="btn btn-dark" onClick={(clickEvent) => deleteResourceClickEvent(clickEvent)}>Delete</button>
                        </div>
                        : ""

                }
            </section>
        </div>
    )
}