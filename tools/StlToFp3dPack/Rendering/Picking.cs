using OpenTK.Mathematics;

namespace StlToFp3dPack.Rendering;

/// <summary>Ray picking against the preview primitives. Pure math; no OpenGL context needed.</summary>
public static class Picking
{
    /// <summary>Returns the index of the closest part hit by a camera ray, or -1.</summary>
    public static int Pick(
        PreviewScene scene,
        Vector3 eye,
        Vector3 forward,
        Vector3 right,
        Vector3 up,
        float ndcX,
        float ndcY)
    {
        Vector3 direction = (forward + right * ndcX + up * ndcY).Normalized();
        int best = -1;
        float bestDistance = float.PositiveInfinity;

        for (int i = 0; i < scene.Parts.Count; i++)
        {
            float? hit = Intersect(eye, direction, scene.Parts[i]);
            if (hit is float distance && distance > 0 && distance < bestDistance)
            {
                bestDistance = distance;
                best = i;
            }
        }
        return best;
    }

    private static float? Intersect(Vector3 origin, Vector3 direction, PreviewPart part)
    {
        float radians = MathHelper.DegreesToRadians(part.YawDegrees);
        float cos = MathF.Cos(radians);
        float sin = MathF.Sin(radians);

        Vector3 offset = origin - part.Center;
        Vector3 localOrigin = new(
            cos * offset.X - sin * offset.Z,
            offset.Y,
            sin * offset.X + cos * offset.Z);
        Vector3 localDirection = new(
            cos * direction.X - sin * direction.Z,
            direction.Y,
            sin * direction.X + cos * direction.Z);

        float tMin = float.NegativeInfinity;
        float tMax = float.PositiveInfinity;
        UpdateAxis(localOrigin.X, localDirection.X, part.HalfExtents.X, ref tMin, ref tMax);
        UpdateAxis(localOrigin.Y, localDirection.Y, part.HalfExtents.Y, ref tMin, ref tMax);
        UpdateAxis(localOrigin.Z, localDirection.Z, part.HalfExtents.Z, ref tMin, ref tMax);

        if (tMax < tMin || tMax < 0)
            return null;
        return tMin >= 0 ? tMin : tMax;
    }

    private static void UpdateAxis(float origin, float direction, float halfExtent, ref float tMin, ref float tMax)
    {
        if (MathF.Abs(direction) < 1e-8f)
        {
            if (origin < -halfExtent || origin > halfExtent)
                tMax = float.NegativeInfinity;
            return;
        }

        float t1 = (-halfExtent - origin) / direction;
        float t2 = (halfExtent - origin) / direction;
        tMin = Math.Max(tMin, Math.Min(t1, t2));
        tMax = Math.Min(tMax, Math.Max(t1, t2));
    }
}
