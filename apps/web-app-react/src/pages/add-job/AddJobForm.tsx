import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "16px",
        fontWeight: 600,
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        transition: "border-color 0.3s",
        outline: "none",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        minHeight: "120px",
        transition: "border-color 0.3s",
        outline: "none",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default function AddJobForm() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        members: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
                <label htmlFor="title" style={styles.label}>
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    style={styles.input}
                    onChange={handleChange}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="content" style={styles.label}>
                    Content:
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    style={styles.textarea}
                    onChange={handleChange}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="members" style={styles.label}>
                    Members:
                </label>
                <input
                    type="text"
                    id="members"
                    name="members"
                    value={formData.members}
                    style={styles.input}
                    onChange={handleChange}
                    readOnly
                    required
                />
            </div>

            <div>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}
