<script lang="ts" context="module">
  export function getDDay (target: Date): Date {
    const now = new Date();
    const delta = new Date(target.getTime() - now.getTime());
    return delta;
  }

  export function getEnterMil (): Date {
    return getDDay(new Date('2022-07-12T12:00:00.000+09:00'));
  }
  export function getExitMil (): Date {
    return getDDay(new Date('2024-01-08T12:00:00.000+09:00'))
  }
</script>