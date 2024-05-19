export interface Assignment {
    _id: string;
	title: string;
	description: string;
    file?: string;
	dueDate: number;
	submitted: boolean;
	grade: "A" | "B" | "C" | "D" | "F" | "late" | "excused" | null;
    score: number | null;
}

export interface Attendance {
    _id: string;
	date: Date;
	status: 'present' | 'absent' | 'late' | 'excused';
	remarks?: string;
    class: string;
}

export interface Resource {
    _id: string;
	title: string;
	url: string;
	description?: string;
}

export interface Schedule {
    _id: string;
	startTime: number;
	endTime: number;
	subject: string;
	link?: string;
    isToday?: boolean;
}