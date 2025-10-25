export interface CourseSection {
  title: string;
  description: string;
  text: string;
}

export interface Course {
  id: string;
  pdf_url: string;
  sections: CourseSection[];
}
