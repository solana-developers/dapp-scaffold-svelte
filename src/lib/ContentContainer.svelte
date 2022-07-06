<div class="flex-1 drawer h-52">
	<input id="my-drawer" type="checkbox" class="grow drawer-toggle" />
	<div class="items-center drawer-content">
		<slot />
	</div>

	<!-- SideBar / Drawer -->
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
			<h1>Menu</h1>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/basics">Basics</a>
			</li>
		</ul>
	</div>
</div>
