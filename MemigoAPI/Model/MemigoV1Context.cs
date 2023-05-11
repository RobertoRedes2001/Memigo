using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MemigoAPI.Model;

public partial class MemigoV1Context : DbContext
{
    public MemigoV1Context()
    {
    }

    public MemigoV1Context(DbContextOptions<MemigoV1Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Meme> Memes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("Server=localhost;Port=3306;Database=memigo_v1;User Id=root;Password=;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Meme>(entity =>
        {
            entity.HasKey(e => e.IdMeme).HasName("PRIMARY");

            entity.ToTable("memes");

            entity.HasIndex(e => e.IdUser, "fk_memes_usu");

            entity.Property(e => e.IdMeme)
                .HasColumnType("int(11)")
                .HasColumnName("idMeme");
            entity.Property(e => e.IdUser)
                .HasColumnType("int(11)")
                .HasColumnName("idUser");
            entity.Property(e => e.Likes)
                .HasColumnType("int(11)")
                .HasColumnName("likes");
            entity.Property(e => e.MemeImg)
                .HasColumnType("mediumtext")
                .HasColumnName("meme_img");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Memes)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("fk_memes_usu");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.IdUser)
                .HasColumnType("int(11)")
                .HasColumnName("idUser");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .HasColumnName("email");
            entity.Property(e => e.Pass)
                .HasMaxLength(200)
                .HasColumnName("pass");
            entity.Property(e => e.UserImg)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("mediumtext")
                .HasColumnName("user_img");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
