// contactSettings.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSettings",
  title: "Contact Section - Settings",
  type: "document",
  fields: [
    {
        name: "general",
        title: "Yleiset yhteystiedot (Ei-lokalisoitu)",
        type: "object",
        options: {
            collapsible: true,
            collapsed: false,
        },
        fields: [
            defineField({
                name: "email",
                title: "Sähköposti (email@osoite.com)",
                type: "string",
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name: "phone",
                title: "Puhelinnumero (+358 40 123 4567)",
                type: "string",
                validation: (Rule) => Rule.required(),
            }),
        ]
    },
    
    // --- FINNISH FIELDS ---
    {
        name: "finnishContent",
        title: "Sisältö: Suomi (FI)",
        type: "object",
        options: {
            collapsible: true,
            collapsed: true,
        },
        fields: [
            defineField({
                name: "eyebrow_fi",
                title: "Eyebrow (FI)",
                type: "string",
            }),
            defineField({
                name: "title_fi",
                title: "Otsikko (FI)",
                type: "string",
            }),
            defineField({
                name: "subtitle_fi",
                title: "Alaotsikko (FI)",
                type: "text",
                rows: 3,
            }),
            defineField({
                name: "contactTitle_fi",
                title: "Yhteystietojen Otsikko (FI)",
                type: "string",
            }),
            defineField({
                name: "contactSubtitle_fi",
                title: "Yhteystietojen Alaotsikko (FI)",
                type: "text",
                rows: 2,
            }),
            defineField({
                name: "ctaText_fi",
                title: "Varausnappi Teksti (FI)",
                type: "string",
            }),
            defineField({
                name: "formTitle_fi",
                title: "Lomakkeen Otsikko (FI)",
                type: "string",
            }),
            defineField({
                name: "formSubtitle_fi",
                title: "Lomakkeen Alaotsikko (FI)",
                type: "text",
                rows: 2,
            }),
            defineField({
                name: "formCta_fi",
                title: "Lomakkeen Lähetysnappi (FI)",
                type: "string",
            }),
            defineField({
                name: "formNameLabel_fi",
                title: "Nimi Kentän Label (FI)",
                type: "string",
            }),
            defineField({
                name: "formEmailLabel_fi",
                title: "Sähköposti Kentän Label (FI)",
                type: "string",
            }),
            defineField({
                name: "formCompanyLabel_fi",
                title: "Yritys Kentän Label (FI)",
                type: "string",
            }),
            defineField({
                name: "formMessageLabel_fi",
                title: "Viesti Kentän Label (FI)",
                type: "string",
            }),
        ],
    },
    
    // --- ENGLISH FIELDS ---
    {
        name: "englishContent",
        title: "Content: English (EN)",
        type: "object",
        options: {
            collapsible: true,
            collapsed: true,
        },
        fields: [
            defineField({
                name: "eyebrow_en",
                title: "Eyebrow (EN)",
                type: "string",
            }),
            defineField({
                name: "title_en",
                title: "Title (EN)",
                type: "string",
            }),
            defineField({
                name: "subtitle_en",
                title: "Subtitle (EN)",
                type: "text",
                rows: 3,
            }),
            defineField({
                name: "contactTitle_en",
                title: "Contact Details Title (EN)",
                type: "string",
            }),
            defineField({
                name: "contactSubtitle_en",
                title: "Contact Details Subtitle (EN)",
                type: "text",
                rows: 2,
            }),
            defineField({
                name: "ctaText_en",
                title: "Booking Button Text (EN)",
                type: "string",
            }),
            defineField({
                name: "formTitle_en",
                title: "Form Title (EN)",
                type: "string",
            }),
            defineField({
                name: "formSubtitle_en",
                title: "Form Subtitle (EN)",
                type: "text",
                rows: 2,
            }),
            defineField({
                name: "formCta_en",
                title: "Form Submit Button (EN)",
                type: "string",
            }),
            defineField({
                name: "formNameLabel_en",
                title: "Name Field Label (EN)",
                type: "string",
            }),
            defineField({
                name: "formEmailLabel_en",
                title: "Email Field Label (EN)",
                type: "string",
            }),
            defineField({
                name: "formCompanyLabel_en",
                title: "Company Field Label (EN)",
                type: "string",
            }),
            defineField({
                name: "formMessageLabel_en",
                title: "Message Field Label (EN)",
                type: "string",
            }),
        ],
    },
  ],
});