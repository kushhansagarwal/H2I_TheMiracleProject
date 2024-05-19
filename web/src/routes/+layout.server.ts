import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';
import { ObjectId } from 'mongodb';
import type { Assignment, Attendance, Resource, Schedule } from '$lib/types';
export async function load({ request }: RequestEvent) {
    const isAuthenticated = await kindeAuthClient.isAuthenticated(
        request as unknown as SessionManager
    );

    let user: {
        family_name: string;
        given_name: string;
        picture: string | null;
        email: string;
        id: string;
        roles?: string[];
        assignments?: Assignment[];
        attendance?: Attendance[];
        resources?: Resource[];
        schedule?: Schedule[];
    };

    if (isAuthenticated) {
        user = await kindeAuthClient.getUser(request as unknown as SessionManager);
        user.roles = ['student'];

        const client = await clientPromise;
        const db = client.db('themiracleproject');
        const usersCollection = db.collection('users');

        await usersCollection.updateOne({ email: user.email }, { $set: user }, { upsert: true });

        const userDoc = await usersCollection.findOne({ email: user.email });
        if (!userDoc) {
            throw new Error('User not found');
        }

        const assignmentIds = userDoc.assignments || [];
        const attendanceIds = userDoc.attendance || [];
        const resourceIds = userDoc.resources || [];
        const scheduleIds = userDoc.schedule || [];

        const userAssignments = await db
            .collection('assignments')
            .find({ _id: { $in: assignmentIds } })
            .toArray();
        const userAttendance = await db
            .collection('attendance')
            .find({ _id: { $in: attendanceIds } })
            .toArray();
        const userResources = await db
            .collection('resources')
            .find({ _id: { $in: resourceIds } })
            .toArray();
        const userSchedule = await db
            .collection('schedules')
            .find({ _id: { $in: scheduleIds } })
            .toArray();

        // Convert ObjectId to string for serialization
        user.assignments = await userAssignments.map(a => ({ ...a, _id: a._id.toString() }));
        user.attendance = await userAttendance.map(a => ({ ...a, _id: a._id.toString() }));
        user.resources = await userResources.map(r => ({ ...r, _id: r._id.toString() }));
        user.schedule = await userSchedule.map(s => ({ ...s, _id: s._id.toString() }));

    } else {
        user = {
            family_name: '',
            given_name: '',
            picture: null,
            email: '',
            id: '',
            roles: []
        };
    }

    return {
        isAuthenticated,
        user,
    };
}