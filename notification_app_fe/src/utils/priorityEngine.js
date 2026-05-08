function basePriority(type) {
  switch (type) {
    case "updates":
      return 50;
    case "social":
      return 30;
    case "promotion":
      return 10;
    default:
      return 0;
  }
}

export function calculatePriority(notification) {
  let score = basePriority(notification.type);

  if (!notification.read) {
    score += 20;
  }

  const createdTime = new Date(notification.createdAt).getTime();
  const now = Date.now();

  const ageHours = (now - createdTime) / (1000 * 60 * 60);

  if (ageHours < 1) {
    score += 25;
  } else if (ageHours < 6) {
    score += 15;
  } else if (ageHours < 24) {
    score += 8;
  }

  return score;
}

export function getTopNotifications(notifications, limit = 5) {
  return [...notifications]
    .map((item) => ({
      ...item,
      priorityScore: calculatePriority(item)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, limit);
}