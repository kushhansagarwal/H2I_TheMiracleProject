<script lang="ts">
	import type { Schedule } from '$lib/types';
	import zoom from '$lib/assets/zoom.svg';

	export let events: Schedule[] = [];

	// Populate the days array with the appropriate date variables
	let days: { date: Date; isCurrentMonth: boolean; events: Schedule[]; isToday: boolean }[] = [];
	const currentDate = new Date(2024, 3, 29);
	const endDate = new Date(2024, 5, 9);

	while (currentDate <= endDate) {
		days.push({
			date: new Date(currentDate),
			isCurrentMonth: currentDate.getMonth() === 4,
			events: [],
			isToday: currentDate.toDateString() === new Date().toDateString()
		});
		currentDate.setDate(currentDate.getDate() + 1);
	}

	// Iterate over days and add events to the corresponding day's events array
	days.forEach((day) => {
		events.forEach((event) => {
			const eventStartDate = new Date(event.startTime * 1000);
			if (
				eventStartDate.getFullYear() === day.date.getFullYear() &&
				eventStartDate.getMonth() === day.date.getMonth() &&
				eventStartDate.getDate() === day.date.getDate()
			) {
				day.events.push(event);
			}
		});
	});

	function getEventTime(dateNum: number) {
		const date = new Date(dateNum);
		return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	let currentClass: Schedule | null = null;

	function updateCurrentClass() {
		const now = new Date();
		const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

		currentClass =
			events.find((event) => {
				const eventStartDate = new Date(event.startTime * 1000);
				return eventStartDate > now && eventStartDate <= oneHourLater;
			}) || null;

		console.log(currentClass);
	}

	// Call the function to initialize the currentClass variable
	updateCurrentClass();
</script>

{#if currentClass}
	<div role="alert" class="alert-primary alert my-5">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/></svg
		>
		<span
			>You have a <span class="font-bold">{currentClass.subject}</span> class in {Math.max(
				0,
				Math.floor((currentClass.startTime * 1000 - Date.now()) / 60000)
			)} minutes</span
		>
		<a href={currentClass.link} target="_blank" class="btn btn-secondary rounded-xl px-2">
			<img src={zoom} alt="zoom" class="h-7" /> Join Now</a
		>
	</div>
{/if}

<!-- component -->
<div class="lg:flex lg:h-full lg:flex-col ">
	<div class="border-2 shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
		<div
			class="grid grid-cols-7 gap-px border-b border-gray-800 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-400 lg:flex-none"
		>
			<div class="flex justify-center bg-base-200 py-2">
				<span>M</span>
				<span class="sr-only sm:not-sr-only">on</span>
			</div>
			<div class="flex justify-center bg-base-200 py-2">
				<span>T</span>
				<span class="sr-only sm:not-sr-only">ue</span>
			</div>
			<div class="flex justify-center bg-base-200 py-2">
				<span>W</span>
				<span class="sr-only sm:not-sr-only">ed</span>
			</div>
			<div class="flex justify-center bg-base-200 py-2">
				<span>T</span>
				<span class="sr-only sm:not-sr-only">hu</span>
			</div>
			<div class="flex justify-center bg-base-200 py-2">
				<span>F</span>
				<span class="sr-only sm:not-sr-only">ri</span>
			</div>
			<div class="flex justify-center bg-base-200 py-2">
				<span>S</span>
				<span class="sr-only sm:not-sr-only">at</span>
			</div>
			<div class="flex justify-center bg-base-200 py-2">
				<span>S</span>
				<span class="sr-only sm:not-sr-only">un</span>
			</div>
		</div>
		<div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
			<div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
				{#each days as day}
					<div
						class="relative {day.isCurrentMonth
							? 'bg-base-200 text-white'
							: 'bg-base-300 text-gray-500'} px-3 py-2"
					>
						<time
							datetime={day.date}
							class={day.isToday
								? 'flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold text-black'
								: ''}>{day.date.getDate()}</time
						>
						{#if day.events.length > 0}
							<ol class="mt-2">
								{#each day.events as event (event._id)}
									<li>
										<a href={event.link} class="group">
											<p
												class="mb-[-10px] flex-auto truncate font-medium text-gray-300 group-hover:text-white"
											>
												{event.subject}
											</p>
											<time
												datetime={getEventTime(event.startTime)}
												class="hidden flex-none text-gray-500 group-hover:text-white xl:block"
											>
												{getEventTime(event.startTime * 1000)}
											</time>
										</a>
									</li>
								{/each}
							</ol>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
