import type { Course } from '@/types/course';
import type { Student } from '@/types/student';
import { personalizeLesson } from '@/actions/personalizeLesson';
import studentsData from '@/app/students/students.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TeachPageProps {
  params: Promise<{
    courseId: string;
    studentEmail: string;
  }>;
}

// Course data from course_analysis_06.json
const mockCourse: Course = {
  id: '06',
  pdf_url: 'Course American History - British North America.pdf',
  sections: [
    {
      title: 'I. Introduction',
      description:
        'Overview of colonial settlement patterns, the development of British North America within the broader Atlantic World, and the establishment of systems that would shape American society for centuries.',
      text: 'Whether they came as servants, slaves, free farmers, religious refugees, or powerful planters, the men and women of the American colonies created new worlds. Native Americans saw fledgling settlements grow into unstoppable beachheads of vast new populations that increasingly monopolized resources and remade the land into something else entirely. Meanwhile, as colonial societies developed in the seventeenth and eighteenth centuries, fluid labor arrangements and racial categories solidified into the race-based, chattel slavery that increasingly defined the economy of the British Empire. The North American mainland originally occupied a small and marginal place in that broad empire, as even the output of its most prosperous colonies paled before the tremendous wealth of Caribbean sugar islands. And yet the colonial backwaters on the North American mainland, ignored by many imperial officials, were nevertheless deeply tied into these larger Atlantic networks. A new and increasingly complex Atlantic World connected the continents of Europe, Africa, and the Americas. Events across the ocean continued to influence the lives of American colonists. Civil war, religious conflict, and nation building transformed seventeenth-century Britain and remade societies on both sides of the ocean. At the same time, colonial settlements grew and matured, developing into powerful societies capable of warring against Native Americans and subduing internal upheaval. Patterns and systems established during the colonial era would continue to shape American society for centuries. And none, perhaps, would be as brutal and destructive as the institution of slavery.',
    },
    {
      title: 'II. Slavery and the Making of Race',
      description:
        'Examination of how slavery evolved in the British colonies, the development of racial categories, the enslavement of both Native Americans and Africans, the Middle Passage, and the legal and social construction of race-based slavery.',
      text: "After his arrival as a missionary in Charles Town, Carolina, in 1706, Reverend Francis Le Jau quickly grew disillusioned by the horrors of American slavery. He met enslaved Africans ravaged by the Middle Passage, Indians traveling south to enslave enemy villages, and colonists terrified of invasions from French Louisiana and Spanish Florida. Slavery and death surrounded him. The 1660s marked a turning point for black men and women in English colonies like Virginia in North America and Barbados in the West Indies. New laws gave legal sanction to the enslavement of people of African descent for life. The permanent deprivation of freedom and the separate legal status of enslaved Africans facilitated the maintenance of strict racial barriers. Skin color became more than a superficial difference; it became the marker of a transcendent, all-encompassing division between two distinct peoples, two races, white and black. Wars offered the most common means for colonists to acquire Native American slaves. Historians estimate that between 24,000 and 51,000 Native Americans were forced into slavery throughout the southern colonies between 1670 and 1715. The demands of growing plantation economies required a more reliable labor force, and the transatlantic slave trade provided such a workforce. European slavers transported millions of Africans across the ocean in a terrifying journey known as the Middle Passage. Recent estimates count between eleven and twelve million Africans forced across the Atlantic between the sixteenth and nineteenth centuries, with about two million deaths at sea as well as an additional several million dying in the trade's overland African leg or during seasoning. About 450,000 Africans landed in British North America, a relatively small portion of the eleven to twelve million victims of the trade. A 1662 Virginia law stated that an enslaved woman's children inherited the condition of their mother; other colonies soon passed similar statutes. This economic strategy on the part of planters created a legal system in which all children born to slave women would be slaves for life, whether the father was white or black, enslaved or free. Most fundamentally, the emergence of modern notions of race was closely related to the colonization of the Americas and the slave trade. The modern idea of race as an inherited physical difference (most often skin color) that is used to support systems of oppression was new in the early modern Atlantic world.",
    },
  ],
};

export default async function TeachPage({ params }: TeachPageProps) {
  const { courseId: _courseId, studentEmail } = await params;
  const decodedEmail = decodeURIComponent(studentEmail);

  // Find the student
  const students = studentsData as Student[];
  const student = students.find((s) => s.email === decodedEmail);

  if (!student) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Student Not Found</h1>
        <p>Could not find student with email: {decodedEmail}</p>
      </div>
    );
  }

  // Personalize each section
  const personalizedSections = await Promise.all(
    mockCourse.sections.map((section) => personalizeLesson(student, section)),
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Teaching Session</h1>
        <p className="text-muted-foreground">Personalized lesson for {student.student_name}</p>
      </div>

      <div className="space-y-6">
        {personalizedSections.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                {result.success ? result.data?.section.title : `Section ${index + 1} - Error`}
              </CardTitle>
              <CardDescription>
                {result.success ? result.data?.section.description : result.error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result.data?.personalizedContent, null, 2)}
                </pre>
              ) : (
                <p className="text-destructive">{result.error}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
