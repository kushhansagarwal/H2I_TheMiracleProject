<script lang="ts">
	import type { Schedule, Assignment } from '$lib/types';
	import zoom from '$lib/assets/zoom.svg';

	export let events: Assignment[] = [];

	enum state {
		idle = 'idle',
		loading = 'loading',
		success = 'success'
	}

	let uploadState = state.idle;


	const handleSubmit = async (e: Event) => {
		uploadState = state.loading;
		
	};
</script>

<div class="grid gap-5">
	{#each events as event}
		<div class="grid rounded-lg bg-base-200 p-10">
			<div class="flex">
				<div class="grow">
					<h2>{event.title}</h2>
					{#if !event.submitted}
						<p class="mb-5 text-sm text-gray-500">
							Due in
							{-Math.floor((event.dueDate * 1000 - Date.now()) / (1000 * 60 * 60 * 24))} {Math.abs(Math.floor((event.dueDate * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) === 1 ? 'day' : 'days'}, 
							{-Math.floor(((event.dueDate * 1000 - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} {Math.abs(Math.floor(((event.dueDate * 1000 - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) === 1 ? 'hour' : 'hours'} and 
							{-Math.floor(((event.dueDate * 1000 - Date.now()) % (1000 * 60 * 60)) / (1000 * 60))} {Math.abs(Math.floor(((event.dueDate * 1000 - Date.now()) % (1000 * 60 * 60)) / (1000 * 60))) === 1 ? 'minute' : 'minutes'} 
						</p>
					{/if}
					<p>{event.description}</p>
				</div>
				{#if event.submitted}
					<div class="flex-none">
						<div
							class="radial-progress {event.grade === 'A'
								? 'text-green-500'
								: event.grade === 'B'
									? 'text-yellow-500'
									: event.grade === 'C'
										? 'text-orange-500'
										: event.grade === 'D'
											? 'text-red-500'
											: 'text-white'}"
							style="--value:{event.score}; "
							role="progressbar"
						>
							<span class="text-xl">{event.grade}</span>
						</div>
					</div>
				{/if}
			</div>
			<div class="divider"></div>
			{#if event.file && event.file.endsWith('.mp3')}
				<h3>Assigned Audio</h3>
				<audio class="my-5" controls>
					<source src={event.file} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			{:else if event.file && event.file.endsWith('.mp4')}
				<h3>Assigned Video</h3>
				<video class="my-5" controls>
					<source src={event.file} type="video/mp4" />
					Your browser does not support the video element.
				</video>
			{/if}
			{#if !event.submitted}
				<h3 class="mb-5 mt-3 mb-5">Your Submission</h3>
				<h4>Submission remarks</h4>
				<textarea class="textarea textarea-bordered mt-3 mb-5" placeholder="Enter your response here"></textarea>
				<h4>Submission file</h4>

				<input on:change={(e) => handleSubmit(e)} id="upload" type="file"  class="file-input file-input-bordered w-full max-w-xs" />
			{/if}
		</div>
	{/each}
</div>
