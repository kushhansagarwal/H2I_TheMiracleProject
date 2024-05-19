<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.png';
	import { goto } from '$app/navigation';
	import Calendar from '$lib/components/Calendar.svelte';
	import Assignments from '$lib/components/Assignments.svelte';
	import Attendance from '$lib/components/Attendance.svelte';
	export let data;

	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/login');
		} else {
			console.log(data.user.schedule);
		}
	});

	enum section {
		assignments,
		grades,
		attendance,
		schedule,
		resources
	}

	let currentSection = section.assignments;

	const user = data.user;
</script>

<section class="p-5">
	<div class="navbar mx-auto max-w-5xl bg-base-100">
		<div class="flex-1">
			<img src={logo} alt="Logo" class="h-10 w-auto" />
		</div>
		<div class="flex-none gap-2">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
					<div class="w-10 rounded-full">
						<img alt="Tailwind CSS Navbar component" src={data.user.picture} />
					</div>
				</div>
				<ul
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a href="/api/auth/logout">Logout</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="mx-auto max-w-5xl">
		<div role="tablist" class="tabs tabs-bordered mb-5 mt-2">
			<input
				on:click={() => (currentSection = section.assignments)}
				type="radio"
				checked
				name="my_tabs_1"
				role="tab"
				class="text-md tab"
				aria-label="Assignments"
			/>

			<input
				on:click={() => (currentSection = section.attendance)}
				type="radio"
				name="my_tabs_1"
				role="tab"
				class="tab"
				aria-label="Attendance"
			/>

			<input
				on:click={() => (currentSection = section.resources)}
				type="radio"
				name="my_tabs_1"
				role="tab"
				class="tab"
				aria-label="Resources"
			/>
			<input
				on:click={() => (currentSection = section.schedule)}
				type="radio"
				name="my_tabs_1"
				role="tab"
				class="tab"
				aria-label="Schedule"
			/>
		</div>
	</div>
	<div class="mx-auto max-w-5xl">
		{#if currentSection === section.assignments}
			<div class="schedule">
				<h2>Assignments</h2>
				<p>Here are the assignments that are available to you</p>
				<div class="divider"></div>
				<Assignments events={user.assignments}></Assignments>
			</div>
		{:else if currentSection === section.attendance}
			<div class="schedule">
				<h2>Assignments</h2>
				<p>Here are the assignments that are available to you</p>
				<div class="divider"></div>
				<Attendance events={user.attendance}></Attendance>
			</div>
		{:else if currentSection === section.grades}
			<div class="grades">
				<h2>Grades</h2>
				<!-- Display grades related information -->
			</div>
		{:else if currentSection === section.resources}
			<div class="resources">
				<h1>Resources</h1>
				<p>Here are the resources that are available to you</p>
				<div class="divider"></div>
				<div class="grid grid-cols-3">
					{#each user.resources as resource}
						<div class="card w-96 bg-base-200 shadow-xl">
							<div class="card-body">
								<h2 class="card-title">{resource.title}</h2>
								<p>{resource.description}</p>
								<div class="card-actions justify-end">
									<a href={resource.url} target="_blank" class="btn btn-primary">Access Resource</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else if currentSection === section.schedule}
			<div class="schedule">
				<h2>Schedule</h2>
				<p>Here is your schedule for the day</p>
				<div class="divider"></div>
				<Calendar events={user.schedule}></Calendar>
			</div>
		{/if}
	</div>
</section>
