<script lang="ts">
	import type { Schedule, Assignment, Attendance } from '$lib/types';
	import zoom from '$lib/assets/zoom.svg';

	export let events: Attendance[] = [];

	function getDate(dateNum: number) {
		const date = new Date(dateNum * 1000);
		return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	$: orderedEvents = events.sort((a, b) => b.date - a.date);
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra">
		<!-- head -->
		<thead>
			<tr>
				<th>Date</th>
				<th>Class</th>
				<th>Status</th>
				<th>Remarks</th>
			</tr>
		</thead>
		<tbody>
			{#each orderedEvents as event}
				<tr>
					<td>{getDate(event.date)}</td>
					<td>{event.class}</td>
					<td>
						<div class="flex">
							<div class="none h-2 w-2 mr-3 mt-[5px] rounded-xl {event.status === 'present' ? 'bg-green-200' : event.status === 'absent' ? 'bg-red-200' : event.status === 'late' ? 'bg-yellow-200' : 'bg-gray-200'}"></div>
							<div class="grow">{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</div>
						</div></td
					>
					<td>{event.remarks || 'No Remarks'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
