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
					<td>{event.status}</td>
					<td>{event.remarks || 'No Remarks'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
